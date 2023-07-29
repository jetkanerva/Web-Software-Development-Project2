import axios from 'axios';

const API_URL = 'http://localhost:3000/api/';

const register = async (email, password) => {
    try {
        const response = await axios.post(API_URL + 'register', {
            email,
            password
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const login = async (email, password) => {
    try {
        const response = await axios.post(API_URL + 'login', {
            email,
            password
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getTopicsByUser = async (userId) => {
    try {
        const response = await axios.get(API_URL + 'topics/' + userId);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const createTopic = async (userId, name) => {
    try {
        const response = await axios.post(API_URL + 'topics', {
            userId,
            name
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { register, login, getTopicsByUser, createTopic };