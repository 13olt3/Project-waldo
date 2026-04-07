const prisma = require("../lib/prisma");
const { body, validationResult, matchedData } = require("express-validator");

const validateUser = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("email")
    .trim()
    .isEmail()
    .withMessage(`Email is not a valid email input, try again.`),
  body("password").isLength({ min: 1 }),
  body("confirmPw")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match."),
];
const validateLogin = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password").isLength({ min: 1 }),
];

const userController = {};
module.exports = userController;
