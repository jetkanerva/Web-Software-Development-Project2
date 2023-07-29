import { sql } from "../database/database.js";

const findUsersWithEmail = async (email) => {
    return await sql`SELECT * FROM users WHERE email = ${ email }`;
};

const addUser = async (email, passwordHash) => {
    await sql`INSERT INTO users (email, password) VALUES (${ email }, ${ passwordHash })`;
};

const isAdmin = async(userId) => {
    const user = await sql`SELECT * FROM users WHERE id = ${userId}`;
    if (!user) {
        return false;
    }
    return user[0].admin;
};

export { addUser, findUsersWithEmail, isAdmin };