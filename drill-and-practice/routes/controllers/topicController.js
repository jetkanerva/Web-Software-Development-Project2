import * as topicService from "../../services/topicService.js";


const getTopics = async({ render, state, response }) => {
    if (!state.session.get("authenticated")) {
        response.status = 302;
        response.redirect(`/auth/login`);
        return;
    }

    const user = await state.session.get('user');
    console.log(user)
    const isAdmin = user.isAdmin;
    const topics = await topicService.getAllTopics();
    console.log(topics)
    render('topics.eta', { topics: topics, isAdmin: isAdmin });
};

const addTopic = async({ request, response, state, render }) => {
    if (!state.session.get("authenticated")) {
        response.status = 302;
        response.redirect(`/auth/login`);
        return;
    }

    const user = await state.session.get('user');
    const isAdmin = user.isAdmin
    if (user && isAdmin) {
        const body = request.body();
        const data = await body.value;

        const name = data.get('name');

        if (name.length < 1) {
            const topics = await topicService.getAllTopics();
            const errorMessage = "Name of the topic must be at least 1 character long!"
            render('topics.eta', { topics: topics, isAdmin: isAdmin, errorMessage: errorMessage });
            return;
        }

        await topicService.createTopic(name, user.id);

        response.status = 302;
        response.redirect('/topics');
    } else {
        response.status = 302;
        response.redirect('/topics');
    }
};

const deleteTopic = async({ params, response, state }) => {
    if (!state.session.get("authenticated")) {
        response.status = 302;
        response.redirect(`/auth/login`);
        return;
    }

    const user = await state.session.get('user');
    console.log(user);
    if (user && user.isAdmin) {
        await topicService.deleteTopic(params.id);
        response.status = 302;
        response.redirect('/topics');
    } else {
        response.status = 302;
        response.redirect('/topics');
    }
};

export { getTopics, addTopic, deleteTopic };