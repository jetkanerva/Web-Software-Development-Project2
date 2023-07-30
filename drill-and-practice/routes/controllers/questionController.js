import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js"

const getTopicById = async({ params, render, state, response }) => {

    if (!state.session.get("authenticated")) {
        response.status = 303;
        response.redirect(`/auth/login`);
        return;
        }

    console.log(params)
    const topic_id = params.id;
    const questions = await questionService.getQuestionsByTopic(topic_id);
    const newQuestion = "";
    render('questions.eta', { questions: questions, topic_id: topic_id, newQuestion: newQuestion });
};

const addQuestion = async({params, request, response, state, render}) => {
    if (!state.session.get("authenticated")) {
        response.status = 303;
        response.redirect(`/auth/login`);
        return;
    }

    const user = await state.session.get('user');

    let user_id = null;
    try {
        user_id = user.id;
    } catch {
        response.status = 303;
        response.redirect(`/auth/login`);
        return;
    }

    const topic_id = params.id;
    const body = request.body();
    const data = await body.value;

    const question_text = data.get('question_text');

    if (question_text.length < 1) {
        const errorMessage = "Question must be atleast 1 characters long";
        const questions = await questionService.getQuestionsByTopic(topic_id);
        render('questions.eta', { questions: questions, topic_id: topic_id, errorMessage: errorMessage, newQuestion: question_text });
        return;
    }

    console.log(question_text);
    await questionService.addQuestion(user_id, topic_id, question_text);

    response.status = 303;
    response.redirect(`/topics/${topic_id}`);

};

const getQuestionById = async({params, render, response, state}) => {
    if (!state.session.get("authenticated")) {
        response.status = 303;
        response.redirect(`/auth/login`);
        return;
    }

    const questionId = params.qId;
    console.log(questionId);
    const question = await questionService.getQuestionById(questionId);
    console.log(question);
    const options = await optionService.getOptionByQuestionId(questionId);
    console.log(options);
    render('question.eta', { question: question, options: options });
};

const getQuizTopics = async({render}) => {
    const data = {
        topics: await topics.getAllTopics()
    };
    render('quizTopics.ejs', data);
};

const getQuizResult = async({params, render}) => {
    const data = {
        result: params.result,
        correctOption: params.result === 'incorrect' ? await quiz.getCorrectOption(params.qId) : null
    };
    render('quizResult.ejs', data);
};

export { getTopicById, addQuestion, getQuizTopics, getQuestionById, getQuizResult };