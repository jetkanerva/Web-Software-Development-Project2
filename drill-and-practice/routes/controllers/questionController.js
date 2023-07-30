import * as questionService from "../../services/questionService.js";

const getTopicById = async({ params, render }) => {
    console.log(params)
    const topic_id = params.id;
    const questions = await questionService.getQuestionsByTopic(topic_id);
    render('questions.eta', { questions: questions, topic_id: topic_id });
};

const addQuestion = async({params, request, response, state}) => {
    const topic_id = params.id;
    const user = await state.session.get('user');

    const body = request.body();
    const data = await body.value;

    const question_text = data.get('question_text');
    console.log(question_text);
    await questionService.addQuestion(user.id, topic_id, question_text);

    response.status = 303;
    response.redirect(`/topics/${topic_id}`);
};

const getQuizTopics = async({render}) => {
    const data = {
        topics: await topics.getAllTopics()
    };
    render('quizTopics.ejs', data);
};

const getQuizQuestion = async({params, render}) => {
    const data = {
        question: await questions.getRandomQuestionByTopicId(params.tId)
    };
    render('quizQuestion.ejs', data);
};

const getQuizResult = async({params, render}) => {
    const data = {
        result: params.result,
        correctOption: params.result === 'incorrect' ? await quiz.getCorrectOption(params.qId) : null
    };
    render('quizResult.ejs', data);
};

export { getTopicById, addQuestion, getQuizTopics, getQuizQuestion, getQuizResult };