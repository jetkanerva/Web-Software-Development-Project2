import { Pool } from 'pg';

const pool = new Pool({
    user: 'your_database_user',
    host: 'localhost',
    database: 'your_database_name',
    password: 'your_database_password',
    port: 5432,
});

const getTopicsByUser = async (user_id) => {
    const query = 'SELECT * FROM topics WHERE user_id = $1';
    const values = [user_id];

    try {
        const { rows } = await pool.query(query, values);
        return rows;
    } catch (error) {
        throw error;
    }
};

const createTopic = async (user_id, name) => {
    const query = 'INSERT INTO topics (user_id, name) VALUES ($1, $2) RETURNING *';
    const values = [user_id, name];

    try {
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

export { getTopicsByUser, createTopic };