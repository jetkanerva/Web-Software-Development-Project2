import * as topicService from "../../services/topicService.js";
import * as quizService from "../../services/quizService.js"

const getQuizzes = async({ render, state, response }) => {

    if (!state.session.get("authenticated")) {
        response.status = 303;
        response.redirect(`/auth/login`);
        return;
    }

    const topics = await topicService.getAllTopics();

    render('quiz.eta', { topics: topics });
};

const getQuizzesById = async({ params, render, state, response }) => {
    console.log("getQuizzesById");

    if (!state.session.get("authenticated")) {
        response.status = 303;
        response.redirect(`/auth/login`);
        return;
    }

    const topic_id = params.id;
    const questions = await quizService.getQuizzesByTopic(topic_id);

    if (questions.length === 0) {
        response.status = 303;
        response.redirect(`/quiz/${topic_id}/questions/${question.id}`);

    } else {
        const randomIndex = Math.floor(Math.random() * questions.length);
        const question = questions[randomIndex];
        response.status = 303;
        response.redirect(`/quiz/${topic_id}/questions/${question.id}`);
    }
};


export { getQuizzes, getQuizzesById };