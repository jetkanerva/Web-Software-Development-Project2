import * as optionService from "../../services/optionService.js";
import * as questionService from "../../services/questionService.js";


const addOption= async({ params, state, response, request, render }) => {
    console.log("addOption");

    if (!state.session.get("authenticated")) {
        response.status = 303;
        response.redirect(`/auth/login`);
        return;
    }
    const topicId = params.id;
    const questionId = params.qId;
    console.log(topicId);
    console.log(questionId);

    const body = request.body();
    const data = await body.value;
    const optionText = data.get('option_text');
    console.log(optionText);

    if (!optionText || optionText < 1) {
        const question = await questionService.getQuestionById(questionId);
        console.log(question);
        const options = await optionService.getOptionByQuestionId(questionId);
        console.log(options);
        const errorMessage = "Option must be at least 1 character long";
        render('question.eta', { question: question, options: options, option_text: optionText, topic_id: topicId, errorMessage: errorMessage });
    }

    let is_correct = data.get("is_correct");
    is_correct = is_correct === "on";
    console.log(is_correct);

    await optionService.addOption(questionId, optionText, is_correct);
    response.redirect(`/topics/${topicId}/questions/${questionId}`);
};

const deleteOption = async({ params, state, response, request, render }) => {
    console.log("deleteOption");

    if (!state.session.get("authenticated")) {
        response.status = 303;
        response.redirect(`/auth/login`);
        return;
    }
    const topicId = params.tid;
    const questionId = params.qId;
    const optionId = params.oId
    console.log(topicId);
    console.log(questionId);
    console.log(optionId);

    await optionService.deleteOption(optionId);

    response.status = 303;
    response.redirect(`/topics/${topicId}/questions/${questionId}`);
};

export { addOption, deleteOption };