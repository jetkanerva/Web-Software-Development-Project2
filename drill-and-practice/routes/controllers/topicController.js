import * as topicService from "../../services/topicService.js";


const getTopics = async({ render, state }) => {
    const user = await state.session.get('user');
    console.log(user)
    const id = user.id;
    const isAdmin = user.isAdmin;
    const topics = await topicService.getAllTopics(id);
    console.log(topics)
    render('topics.eta', { topics: topics, isAdmin: isAdmin });
};

const addTopic = async({ request, response, state }) => {
    const user = await state.session.get('user');
    if (user && user.isAdmin) {
        const body = request.body();
        const data = await body.value;

        const name = data.get('name');
        await topicService.createTopic(name, user.id);

        response.status = 303;
        response.redirect('/topics');
    } else {
        response.redirect('/auth/login');
    }
};

const deleteTopic = async({params, response, session}) => {
    const user = await session.get('user');
    if (user && user.isAdmin) {
        await topics.deleteTopic(params.id);
        response.redirect('/topics');
    } else {
        response.redirect('/auth/login');
    }
};

export { getTopics, addTopic, deleteTopic };