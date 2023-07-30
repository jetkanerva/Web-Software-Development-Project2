import { sql } from "../database/database.js";

const countTopics = async () => {
    const res = await sql`SELECT COUNT(*) FROM topics;`;
    return res[0].count;
};

const countQuestions = async () => {
    const res = await sql`SELECT COUNT(*) FROM questions;`;
    return res[0].count;
};

const countAnswers = async () => {
    const res = await sql`SELECT COUNT(*) FROM question_answers;`;
    return res[0].count;
};

export {
    countTopics,
    countQuestions,
    countAnswers
};