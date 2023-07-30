import * as optionService from "../../services/optionService.js";


const addOption= async({ params, state, response, request }) => {
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
    let is_correct = data.get("is_correct");
    is_correct = is_correct === "on";
    console.log(is_correct);

    await optionService.addOption(questionId, optionText, is_correct);
    response.redirect(`/topics/${topicId}/questions/${questionId}`);
};

export { addOption };