import { sql } from "../database/database.js";

const getRandomQuestion = async () => {
    const question = await sql`SELECT * FROM questions ORDER BY RANDOM() LIMIT 1`;
    console.log(question);
    const questionId = question[0].id;
    console.log(questionId);
    const options = await sql`SELECT * FROM question_answer_options WHERE question_id = ${ questionId }`;
    console.log(options);

    if (question.length > 0 && options.length > 0) {
        console.log(question)
        console.log(options)
        return {question, options};
    } else {
        console.log("null")
        return null;
    }
};

const isCorrectAnswer = async (optionId) => {
    const correctOption = await sql`SELECT * FROM question_answer_options WHERE id = ${optionId} AND is_correct = true`;
    return correctOption.length > 0;
};

export { getRandomQuestion, isCorrectAnswer };