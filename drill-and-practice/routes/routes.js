import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as authController from "./controllers/authController.js";
import * as quizController from "./controllers/quizController.js";
import * as apiController from "./controllers/apiController.js";

const router = new Router();

// Main Page
router.get("/", mainController.showMain);

// Topics
router.get("/topics", topicController.showTopicsList);
router.post("/topics", topicController.createTopic);
router.post("/topics/:id/delete", topicController.deleteTopic);

// Topic Questions
router.get("/topics/:id", topicController.showTopicQuestions);
router.post("/topics/:id/questions", topicController.createQuestion);
router.post("/topics/:id/questions/:qId/delete", topicController.deleteQuestion);

// Topic Question Options
router.get("/topics/:id/questions/:qId", topicController.showQuestionOptions);
router.post("/topics/:id/questions/:qId/options", topicController.addOption);
router.post("/topics/:id/questions/:qId/options/:oId/delete", topicController.deleteOption);

// Authentication
router.get("/auth/register", authController.registerForm);
router.post("/auth/register", authController.registerUser);
router.get("/auth/login", authController.loginForm);
router.post("/auth/login", authController.loginUser);

// Quiz
router.get("/quiz", quizController.getQuizTopics);
router.get("/quiz/:tId", quizController.getQuizQuestion);
router.get("/quiz/:tId/questions/:qId", quizController.getQuizResult);
router.post("/quiz/:tId/questions/:qId/options/:oId", quizController.postQuizAnswer);
router.get("/quiz/:tId/questions/:qId/correct", quizController.showCorrect);
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.showIncorrect);

// API
router.get("/api/questions/random", apiController.getRandomQuestion);
router.post("/api/questions/answer", apiController.answerQuestion);

export { router };
