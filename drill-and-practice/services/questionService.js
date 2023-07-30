import { sql } from "../database/database.js";

const getQuestionsByTopic = async (topic_id) => {
    return await sql`SELECT * FROM questions WHERE topic_id = ${ topic_id }`;
};

const addQuestion = async (user_id, topic_id, question_text) => {
    await sql`INSERT INTO questions (user_id, topic_id, question_text) VALUES (${ user_id}, ${topic_id}, ${question_text})`;
};

const answerQuestion = async (user_id, question_id, question_answer_option_id) => {
    const query = sql`INSERT INTO question_answers (user_id, question_id, question_answer_option_id) VALUES ($1, $2, $3) RETURNING *`;
    const values = [user_id, question_id, question_answer_option_id];

    try {
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

export { getQuestionsByTopic, addQuestion, answerQuestion };