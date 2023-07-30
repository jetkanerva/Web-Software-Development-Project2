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
    console.log("getQuizzesByTopic");

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

const isOptionCorrect = async({ params, state, response }) => {
    console.log("isOptionCorrect")
    if (!state.session.get("authenticated")) {
        response.status = 303;
        response.redirect(`/auth/login`);
        return;
    }

    const topicId = params.tId;
    const questionId = params.qId
    const optionId = params.oId;
    const userId = await state.session.get('user').id;

    const isCorrect = await quizService.isOptionCorrect(optionId, questionId, userId);
    console.log(isCorrect);

    if (isCorrect) {
        response.status = 303;
        response.redirect(`/quiz/${topicId}/questions/${questionId}/correct`);
    } else {
        response.status = 303;
        response.redirect(`/quiz/${topicId}/questions/${questionId}/incorrect`);
    }
};

const showCorrect = async({ render, state, response, params }) => {
    if (!state.session.get("authenticated")) {
        response.status = 303;
        response.redirect(`/auth/login`);
        return;
    }
    const topic_id = params.tId;

    render('correct.eta', {topic_id: topic_id});
};

const showIncorrect = async({ render, state, response, params }) => {
    if (!state.session.get("authenticated")) {
        response.status = 303;
        response.redirect(`/auth/login`);
        return;
    }
    const topic_id = params.tId;
    const questionId = params.qId;
    const correct_answer = await quizService.correctAnswer(questionId);
    console.log(correct_answer);

    render('incorrect.eta', {topic_id: topic_id, correct_answer: correct_answer});
};

export { getQuizzes, getQuizzesByTopic, getQuizzesByQuestion, isOptionCorrect, showCorrect, showIncorrect };