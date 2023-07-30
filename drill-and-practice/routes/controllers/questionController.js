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

    const topicId = params.id;
    const questionId = params.qId;
    console.log(questionId);
    const question = await questionService.getQuestionById(questionId);
    console.log(question);
    const options = await optionService.getOptionByQuestionId(questionId);
    console.log(options);
    const option_text = "";
    render('question.eta', { question: question, options: options, option_text: option_text, topic_id: topicId });
};

const deleteQuestionById = async({ response, params }) => {
    await questionService.deleteQuestionById(params.qId);

    response.status = 303;
    response.redirect(`/topics/${params.tId}`);
};

export { getTopicById, addQuestion, getQuestionById, deleteQuestionById };