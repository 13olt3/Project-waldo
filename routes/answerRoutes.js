const { Router } = require("express");
const answerController = require("../controllers/answerController");

const answerRouter = new Router();

answerRouter.post("/", answerController.checkAnswer);

module.exports = answerRouter;
