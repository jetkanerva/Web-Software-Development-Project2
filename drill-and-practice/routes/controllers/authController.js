import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import * as authService from "../../services/authService.js";

const showLoginForm = async ({ render}) => {
    render("login.eta");
};

const showRegistrationForm = ({ render }) => {
    render("register.eta");
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

    await state.session.set("authenticated", true);
    await state.session.set("user", {
        id: userObj.id,
        email: userObj.email,
    });
    response.redirect("/topics");
};

const postRegistrationForm = async ({ request, response }) => {
    const body = request.body();
    const params = await body.value;

    const email = params.get("email");
    const password = params.get("password");
    const verification = params.get("verification");

    if (password !== verification) {
        response.body = "The entered passwords did not match";
        return;
    }

    const existingUsers = await authService.findUsersWithEmail(email);
    if (existingUsers.length > 0) {
        response.body = "The email is already reserved.";
        return;
    }

    const hash = await bcrypt.hash(password);
    await authService.addUser(email, hash);
    response.redirect("/auth/login");
};

export { postLoginForm, postRegistrationForm, showLoginForm, showRegistrationForm };