import { sql } from "../database/database.js";

const getQuestionsByTopic = async (topic_id) => {
    return await sql`SELECT * FROM questions WHERE topic_id = ${ topic_id }`;
};

const addQuestion = async (user_id, topic_id, question_text) => {
    await sql`INSERT INTO questions (user_id, topic_id, question_text) VALUES (${ user_id}, ${topic_id}, ${question_text})`;
};

const getQuestionById = async (question_id) => {
    const questions = await sql`SELECT * FROM questions WHERE id = ${ question_id }`;
    return questions[0];
};

const deleteQuestionById = async (question_id) => {
    await sql`DELETE FROM questions WHERE id = ${ question_id }`;
};

export { getQuestionsByTopic, addQuestion, getQuestionById, deleteQuestionById };