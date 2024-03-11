require("dotenv").config();

const CONFIG = {
  MONGODB_URL: process.env.MONGODB_URL,
  CLIENT_URL: process.env.CLIENT_URL,
};

module.exports = CONFIG;
