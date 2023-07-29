import { sql } from "../database/database.js";

const getAllTopics = async (userId) => {
    return await sql`SELECT * FROM topics`;
};

const createTopic = async (name, userId) => {
    await sql`INSERT INTO topics (name, user_id) VALUES (${name}, ${userId})`;
};

export { getAllTopics, createTopic };