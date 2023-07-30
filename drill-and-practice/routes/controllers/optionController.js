import * as optionService from "../../services/optionService.js";


const addOption= async({ params, state, response }) => {
    if (!state.session.get("authenticated")) {
        response.status = 303;
        response.redirect(`/auth/login`);
        return;
    }

    const body = request.body();
    const data = await body.value;
    const optionText = data.get('option_text');

    const topicId = params.id;
    const questionId = params.qId;

    await optionService.addOption(topicId, questionId, optionText);

};

export { addOption };