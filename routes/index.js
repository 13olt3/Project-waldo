const { Router } = require("express");

const firstRouter = require("./firstRoutes");

const indexRouter = Router({ mergeParams: true });

indexRouter.use("/api/first", firstRouter);

module.exports = indexRouter;
