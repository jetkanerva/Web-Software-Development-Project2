import * as apiService from "../../services/apiService.js"

const getQuestion = async({ response }) => {
    const data = await apiService.getRandomQuestion();
    if (data) {
        response.body = {
            questionId: data.question[0].id,
            questionText: data.question[0].question_text,
            answerOptions: data.options.map(option => {
                return {
                    optionId: option.id,
                    optionText: option.option_text
                }
            })
        };
    } else {
        response.status = 404;
        response.body = {};
    }
};

const isOptionCorrect = async({ request, response }) => {
    const body = request.body();
    const data = await body.value;
    const optionId= data.optionId;

    const isCorrect = await apiService.isCorrectAnswer(optionId);

    console.log(isCorrect);
    response.body = { correct: isCorrect };
};

export { getQuestion, isOptionCorrect };