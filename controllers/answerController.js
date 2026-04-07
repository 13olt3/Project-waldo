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
// function answerChecker(userAnswer, solution) {
//   let finalAnswer = true;
//   let answerArray = {};

//   Object.entries(userAnswer).forEach((answer) => {
//     for (let i = 0; i < solution.length; i++) {
//       if (answer[0] === solution[i].name) {
//         if (
//           Math.abs(answer[1].x - solution[i].locationX) > solution[i].radius
//         ) {
//           finalAnswer = false;

//         } else if (
//           Math.abs(answer[1].y - solution[i].locationY) > solution[i].radius
//         ) {
//           finalAnswer = false;
//         } else {
//         }
//       }
//     }
//   });
//   return finalAnswer;
// }
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

const answerController = {
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

  createAnswer: [],
};

module.exports = answerController;

// console.log(userAnswer);
// console.log(solution);
// console.log(Object.entries(userAnswer));
//   console.log(`user asnwer: ${JSON.stringify(answer[1])}`);
// console.log(solution[i].locationX, solution[i].locationY);
// console.log(
//   `maths: ${Math.abs(answer[1].x - solution[i].locationX) > solution[i].radius}`,
// );
