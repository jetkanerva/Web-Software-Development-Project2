import { topics, questions, quiz } from "../../deps.js";

const getAllTopics = async({response}) => {
    const data = await topics.getAllTopics();
    response.body = data;
};

const getQuestionByTopic = async({params, response}) => {
    const question = await questions.getRandomQuestionByTopicId(params.tId);
    if (question) {
        response.body = question;
    } else {
        response.status = 404;
        response.body = { error: "No question found for this topic" };
    }
};

const checkAnswer = async({params, request, response}) => {
    const body = request.body();
    const answer = await body.value;

    const isCorrect = await quiz.checkAnswer(params.qId, answer.optionId);
    response.body = { isCorrect: isCorrect };
};

export { getAllTopics, getQuestionByTopic, checkAnswer };