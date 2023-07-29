

const getTopics = async({render}) => {
    const data = {
        topics: await topics.getAllTopics()
    };
    render('topics.ejs', data);
};

const getTopicById = async({params, render}) => {
    const data = {
        topic: await topics.getTopicById(params.id),
        questions: await questions.getQuestionsByTopicId(params.id)
    };
    render('topic.ejs', data);
};

const postTopic = async({request, response, session}) => {
    const user = await session.get('user');
    if (user && user.isAdmin) {
        const body = request.body();
        const params = await body.value;

        const name = params.get('name');
        await topics.createTopic(name);

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

export { getTopics, getTopicById, postTopic, deleteTopic };