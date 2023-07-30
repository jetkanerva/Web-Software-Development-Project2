import * as statisticsService from "../../services/statisticsService.js"

const showMain = async({ render }) => {
  const topicCount = await statisticsService.countTopics();
  const questionCount = await statisticsService.countQuestions();
  const answerCount = await statisticsService.countAnswers();
  console.log(topicCount)
  console.log(answerCount)
  console.log(questionCount)
  render("main.eta", { topicCount, questionCount, answerCount });
};

export { showMain };
