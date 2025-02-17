import { sql } from "../database/database.js";

const addOption = async (questionId, option_text, is_correct) => {
    await sql`INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES (${questionId}, ${option_text}, ${is_correct})`;
};

const getOptionByQuestionId = async(questionId) => {
    return await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionId}`;
}

const deleteOption = async(optionId) => {
    await sql`DELETE FROM question_answers WHERE question_answer_option_id = ${optionId}`;
    await sql`DELETE FROM question_answer_options WHERE id = ${optionId}`;
}

export { addOption, getOptionByQuestionId, deleteOption };