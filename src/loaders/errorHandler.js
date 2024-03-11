const createError = require("http-errors");

async function errorHandlerLoader(app) {
  app.use((req, res, next) => {
    next(createError(404));
  });

  app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.statue || 500);
    res.json({ message: err.message });
  });
}

module.exports = errorHandlerLoader;
