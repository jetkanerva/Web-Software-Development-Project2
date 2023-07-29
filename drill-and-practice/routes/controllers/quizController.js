

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

const postQuizAnswer = async({params, request, response}) => {
    const body = request.body();
    const answer = await body.value;

    const isCorrect = await quiz.checkAnswer(params.qId, answer.get('optionId'));
    response.redirect(`/quiz/${params.tId}/questions/${params.qId}/${isCorrect ? 'correct' : 'incorrect'}`);
};

const getQuizResult = async({params, render}) => {
    const data = {
        result: params.result,
        correctOption: params.result === 'incorrect' ? await quiz.getCorrectOption(params.qId) : null
    };
    render('quizResult.ejs', data);
};

export { getQuizTopics, getQuizQuestion, postQuizAnswer, getQuizResult };