require("dotenv").config();

const CONFIG = {
  MONGODB_URL: process.env.MONGODB_URL,
  CLIENT_URL: process.env.CLIENT_URL,
  SECRET_KEY: process.env.SECRET_KEY,
  HOUR_IN_MS: 1000 * 60 * 60 * 4,
};

module.exports = CONFIG;
