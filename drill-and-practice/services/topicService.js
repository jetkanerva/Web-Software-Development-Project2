import { sql } from "../database/database.js";

const getAllTopics = async () => {
    return await sql`SELECT * FROM topics ORDER BY name`;
};

const createTopic = async (name, userId) => {
    await sql`INSERT INTO topics (name, user_id) VALUES (${name}, ${userId})`;
};

const deleteTopic = async (topicId) => {
    await sql`DELETE FROM topics WHERE id = ${topicId}`;
    const question_id = await sql`SELECT id FROM questions WHERE topic_id = ${topicId}`;
    console.log(question_id)
    await sql`DELETE FROM questions WHERE topic_id = ${topicId}`;
    let question = "";
    for (question in question_id) {
        console.log(question)
        await sql`DELETE FROM question_answer_options WHERE question_id = ${question}`;
        await sql`DELETE FROM question_answers WHERE question_id = ${question}`;
    }
};

export { getAllTopics, createTopic, deleteTopic };