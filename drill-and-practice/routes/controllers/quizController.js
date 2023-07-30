import * as topicService from "../../services/topicService.js";
import * as quizService from "../../services/quizService.js"
import * as questionService from "../../services/questionService.js";

const getQuizzes = async({ render, state, response }) => {

    if (!state.session.get("authenticated")) {
        response.status = 303;
        response.redirect(`/auth/login`);
        return;
    }

    const topics = await topicService.getAllTopics();

    render('quiz.eta', { topics: topics });
};

const getQuizzesByTopic = async({ params, render, state, response }) => {
    console.log("getQuizzesById");

    if (!state.session.get("authenticated")) {
        response.status = 303;
        response.redirect(`/auth/login`);
        return;
    }

    const topic_id = params.tId;
    const questions = await quizService.getQuizzesByTopic(topic_id);

    if (questions.length === 0) {
        response.status = 303;
        response.redirect(`/quiz`);

    } else {
        console.log(questions)
        const randomIndex = Math.floor(Math.random() * questions.length);
        const question = questions[randomIndex];
        response.status = 303;
        response.redirect(`/quiz/${topic_id}/questions/${question.id}`);
    }
};

const getQuizzesByQuestion = async({ params, render, state, response }) => {
    if (!state.session.get("authenticated")) {
        response.status = 303;
        response.redirect(`/auth/login`);
        return;
    }

    const questionId = params.qId;
    console.log(questionId);

    const question = await questionService.getQuestionById(questionId);
    console.log(question);
    const quizzes = await quizService.getQuizzesByQuestion(questionId);
    console.log(quizzes)

    render('quiz_options.eta', {quizzes: quizzes, question: question});
};

export { getQuizzes, getQuizzesByTopic, getQuizzesByQuestion };