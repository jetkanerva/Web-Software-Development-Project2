import { sql } from "../database/database.js";

const getQuizzesByTopic = async (topicId) => {
    return await sql`SELECT * FROM questions WHERE topic_id = ${topicId}`;
};

const getQuizzesByQuestion = async (questionId) => {
    return await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionId}`;
};

export { getQuizzesByTopic, getQuizzesByQuestion }