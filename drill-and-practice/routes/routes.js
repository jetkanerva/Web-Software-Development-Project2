import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as authController from "./controllers/authController.js";
import * as questionController from "./controllers/questionController.js";
import * as optionController from "./controllers/optionController.js"
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

// Question Answer Options
router.post("/topics/:id/questions/:qId/options", optionController.addOption)

export { router };
