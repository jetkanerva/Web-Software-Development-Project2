import { sql } from "../database/database.js";

const getQuizzesByTopic = async (topicId) => {
    return await sql`SELECT * FROM questions WHERE topic_id = ${topicId}`;
};

export { getQuizzesByTopic }