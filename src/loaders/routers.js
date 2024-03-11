const authRouter = require("../routes/auth");

async function routerLoader(app) {
  app.use("/auth", authRouter);
}

module.exports = routerLoader;
