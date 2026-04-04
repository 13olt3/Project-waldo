const { Router } = require("express");
const userRouter = require("./userRoutes");

const indexRouter = Router({ mergeParams: true });

indexRouter.use("/api/users", userRouter);

module.exports = indexRouter;
