import { sql } from "../database/database.js";

const getQuizzesByTopic = async (topicId) => {
    return await sql`SELECT * FROM questions WHERE topic_id = ${topicId}`;
};

const getQuizzesByQuestion = async (questionId) => {
    return await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionId}`;
};

const isOptionCorrect = async (optionId) => {
    const option = await sql`SELECT is_correct FROM question_answer_options WHERE id = ${optionId}`;
    return option[0].is_correct;
};

export { getQuizzesByTopic, getQuizzesByQuestion, isOptionCorrect }