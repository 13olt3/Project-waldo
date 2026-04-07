const { Router } = require("express");
const userRouter = require("./userRoutes");
const answerRouter = require("./answerRoutes");

const indexRouter = Router({ mergeParams: true });

indexRouter.use("/api/user", userRouter);
indexRouter.use("/api/answer", answerRouter);

module.exports = indexRouter;
