import { sql } from "../database/database.js";

const addOption = async (topicId, questionId) => {
    await sql`INSERT INTO topics (name, user_id) VALUES (${name}, ${userId})`;
};

const getOptionByQuestionId = async(questionId) => {
    return await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionId}`;
}

export { addOption, getOptionByQuestionId };