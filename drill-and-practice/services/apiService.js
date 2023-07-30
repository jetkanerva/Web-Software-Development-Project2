
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

export { getTopicsByUser, createTopic };