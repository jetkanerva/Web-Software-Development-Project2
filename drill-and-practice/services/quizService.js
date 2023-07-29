import { Pool } from 'pg';

const pool = new Pool({
    user: 'your_database_user',
    host: 'localhost',
    database: 'your_database_name',
    password: 'your_database_password',
    port: 5432,
});

const getQuestionsByTopic = async (topic_id) => {
    const query = 'SELECT * FROM questions WHERE topic_id = $1';
    const values = [topic_id];

    try {
        const { rows } = await pool.query(query, values);
        return rows;
    } catch (error) {
        throw error;
    }
};

const createQuestion = async (user_id, topic_id, question_text) => {
    const query = 'INSERT INTO questions (user_id, topic_id, question_text) VALUES ($1, $2, $3) RETURNING *';
    const values = [user_id, topic_id, question_text];

    try {
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

const answerQuestion = async (user_id, question_id, question_answer_option_id) => {
    const query = 'INSERT INTO question_answers (user_id, question_id, question_answer_option_id) VALUES ($1, $2, $3) RETURNING *';
    const values = [user_id, question_id, question_answer_option_id];

    try {
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

export { getQuestionsByTopic, createQuestion, answerQuestion };