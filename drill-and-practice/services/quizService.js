import { sql } from "../database/database.js";

const getQuizzesByTopic = async (topicId) => {
    return await sql`SELECT * FROM questions WHERE topic_id = ${topicId}`;
};

const getQuizzesByQuestion = async (questionId) => {
    return await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionId}`;
};

const isOptionCorrect = async (optionId, questionId, userId) => {
    try {
        await sql`INSERT INTO question_answers (user_id, question_id, question_answer_option_id)
                   VALUES (${userId}, ${questionId}, ${optionId})`;
    } catch {
        console.log("answer likely already exits")
    }
    const option = await sql`SELECT is_correct FROM question_answer_options WHERE id = ${optionId}`;
    return option[0].is_correct;
};

const correctAnswer = async (questionId) => {
    return await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionId} AND is_correct = true`;
}

export { getQuizzesByTopic, getQuizzesByQuestion, isOptionCorrect, correctAnswer }