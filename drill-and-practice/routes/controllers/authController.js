import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import * as authService from "../../services/authService.js";

const showLoginForm = async ({ render }) => {
    render("login.eta");
};

const showRegistrationForm = ({ render }) => {

    render("register.eta", { email: ""});
};

const postLoginForm = async ({ request, response, state, render }) => {

    const body = request.body();
    const params = await body.value;

    const email = params.get("email");
    const password = params.get("password");

    const existingUsers = await authService.findUsersWithEmail(email);
    if (existingUsers.length === 0) {
        response.status = 401;
        return;
    }

    const userObj = existingUsers[0];

    const hash = userObj.password;

    const passwordCorrect = await bcrypt.compare(password, hash);
    if (!passwordCorrect) {
        console.log("invalid password posted")
        const errorMessage = "Invalid credentials";
        render("login.eta", { errorMessage: errorMessage });
        return;
    }

    const isAdmin = await authService.isAdmin(userObj.id);
    console.log(isAdmin);

    await state.session.set("authenticated", true);
    await state.session.set("user", {
        id: userObj.id,
        email: userObj.email,
        isAdmin: isAdmin,
    });
    response.redirect("/topics");
};

const postRegistrationForm = async ({ request, response, render }) => {

    const body = request.body();
    const params = await body.value;

    const email = params.get("email");
    const password = params.get("password");

    const existingUsers = await authService.findUsersWithEmail(email);
    if (existingUsers.length > 0) {
        response.body = "The email is already reserved.";
        return;
    }

    console.log(password.length)

    if (password.length < 4) {
        const errorMessage = "Password must be at least 4 characters long";
        render("register.eta", { errorMessage: errorMessage, email });
        return;
    }

    const hash = await bcrypt.hash(password);
    await authService.addUser(email, hash);
    response.redirect("/auth/login");
};

export { postLoginForm, postRegistrationForm, showLoginForm, showRegistrationForm };