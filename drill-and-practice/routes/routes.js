import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as authController from "./controllers/authController.js";
import * as questionController from "./controllers/questionController.js";
import * as optionController from "./controllers/optionController.js"
import * as quizController from "./controllers/quizController.js"
import * as apiController from "./controllers/apiController.js";

const router = new Router();

// Main Page
router.get("/", mainController.showMain);

// Authentication
router.get("/auth/register", authController.showRegistrationForm);
router.post("/auth/register", authController.postRegistrationForm);
router.get("/auth/login", authController.showLoginForm);
router.post("/auth/login", authController.postLoginForm);

// Topics
router.get("/topics", topicController.getTopics)
router.post("/topics", topicController.addTopic)
router.post("/topics/:id/delete", topicController.deleteTopic)

// Questions
router.get("/topics/:id", questionController.getTopicById)
router.post("/topics/:id/questions", questionController.addQuestion)
router.get("/topics/:id/questions/:qId", questionController.getQuestionById)
router.post("/topics/:tId/questions/:qId/delete", questionController.deleteQuestionById)

// Question Answer Options
router.post("/topics/:id/questions/:qId/options", optionController.addOption)
router.post("/topics/:tId/questions/:qId/options/:oId/delete", optionController.deleteOption)

// Quizzes
router.get("/quiz", quizController.getQuizzes)
router.get("/quiz/:tId", quizController.getQuizzesByTopic)
router.get("/quiz/:tId/questions/:qId", quizController.getQuizzesByQuestion)
router.post("/quiz/:tId/questions/:qId/options/:oId", quizController.isOptionCorrect)
router.get("/quiz/:tId/questions/:qId/correct", quizController.showCorrect)
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.showIncorrect)

// API
router.get("/api/questions/random", apiController.getQuestion)

export { router };
