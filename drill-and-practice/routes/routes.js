import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as authController from "./controllers/authController.js";
import * as quizController from "./controllers/quizController.js";
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

export { router };
