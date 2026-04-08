const { Router } = require("express");
const firstController = require("../controllers/firstController");

const firstRouter = new Router();

firstRouter.post("/", firstController.checkAnswer);
firstRouter.get("/scoreboard", firstController.showScoreboard);
firstRouter.post("/timer", firstController.startTimer);
firstRouter.post("/end", firstController.endTimer);

module.exports = firstRouter;
