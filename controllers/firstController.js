const prisma = require("../lib/prisma");
const { body, validationResult, matchedData } = require("express-validator");

const validateAnswer = [
  body("black.x").isFloat(),
  body("black.y").isFloat(),
  body("white.x").isFloat(),
  body("white.y").isFloat(),
  body("dead.x").isFloat(),
  body("dead.y").isFloat(),
];

function answerChecker(userAnswer, solution) {
  const results = {};

  Object.entries(userAnswer).forEach(([name, coords]) => {
    const target = solution.find((s) => s.name === name);

    if (!target) {
      results[name] = false;
      return;
    }
    //this is a failsafe to prevent invalid data

    let isCorrect = true;
    if (
      Math.abs(coords.x - target.locationX) >= target.radius ||
      Math.abs(coords.y - target.locationY) >= target.radius
    ) {
      isCorrect = false;
    }

    results[name] = isCorrect;
  });

  return results;
}

const firstController = {
  checkAnswer: [
    validateAnswer,
    async (req, res) => {
      const data = matchedData(req);
      const correctAnswer = await prisma.character.findMany({
        select: { name: true, locationX: true, locationY: true, radius: true },
      });

      res.json(answerChecker(data, correctAnswer));
    },
  ],

  startTimer: [
    async (req, res) => {
      const session = await prisma.gameSession.create({
        data: {},
      });
      res.json({ sessionId: session.id });
    },
  ],
  endTimer: [
    async (req, res) => {
      const gameId = req.body.session;
      const username = req.body.username;
      const imgName = req.body.imgName;

      const data = await prisma.gameSession.findUnique({
        where: { id: gameId },
      });
      const endTime = new Date();
      const gameTimeMs = endTime - data.startTime;
      const gameTimeS = gameTimeMs / 1000;
      const updatedData = await prisma.gameSession.update({
        where: { id: gameId },
        data: { endTime: endTime, score: gameTimeS },
      });

      await prisma.score.create({
        data: {
          timeInSeconds: gameTimeS,
          playername: username,
          image: {
            connect: {
              imagename: imgName,
            },
          },
        },
      });

      res.json(updatedData);
    },
  ],
  showScoreboard: [
    async (req, res) => {
      const scoreboardData = await prisma.score.findMany({
        orderBy: { timeInSeconds: "asc" },
        take: 10,
      });
      res.json(scoreboardData);
    },
  ],
};

module.exports = firstController;

// console.log(userAnswer);
// console.log(solution);
// console.log(Object.entries(userAnswer));
//   console.log(`user asnwer: ${JSON.stringify(answer[1])}`);
// console.log(solution[i].locationX, solution[i].locationY);
// console.log(
//   `maths: ${Math.abs(answer[1].x - solution[i].locationX) > solution[i].radius}`,
// );
