const authRouter = require("../routes/auth");
const userRouter = require("../routes/users");
const testerRouter = require("../routes/tester");

async function routerLoader(app) {
  app.use("/auth", authRouter);
  app.use("/users", userRouter);
  app.use("/testers", testerRouter);
}

module.exports = routerLoader;
