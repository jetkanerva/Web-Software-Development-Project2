import { bcrypt, validate, users } from "../../deps.js";

const loginForm = () => {
    return {
        email: "",
        password: ""
    };
};

const registerForm = () => {
    return {
        email: "",
        password: ""
    };
};

const loginUser = async({request, response, session}) => {
    const body = request.body();
    const params = await body.value;

    const email = params.get('email');
    const password = params.get('password');

    const user = await users.findUserByEmail(email);
    if (user) {
        const hash = user.password;
        const passwordCorrect = await bcrypt.compare(password, hash);
        if (passwordCorrect) {
            await session.set('authenticated', true);
            await session.set('user', {
                id: user.id,
                email: user.email
            });
            response.redirect('/topics');
        } else {
            response.redirect('/auth/login');
        }
    } else {
        response.redirect('/auth/login');
    }
};

const registerUser = async({request, response}) => {
    const body = request.body();
    const params = await body.value;

    const email = params.get('email');
    const password = params.get('password');

    const validationErrors = validate({ email, password });
    if (validationErrors.length > 0) {
        // handle validation errors
        return;
    }

    const existingUser = await users.findUserByEmail(email);
    if (existingUser === undefined) {
        const hash = await bcrypt.hash(password);
        await users.addUser(email, hash);
        response.redirect('/auth/login');
    } else {
        // User with this email already exists
        return;
    }
};

const logoutUser = async({response, session}) => {
    await session.set('authenticated', false);
    await session.set('user', null);
    response.redirect('/');
};

export { loginUser, registerUser, logoutUser, loginForm, registerForm };