const mongoose = require("mongoose");
const CONFIG = require("../constants/config");

async function mongooseLoader() {
  try {
    await mongoose.connect(CONFIG.MONGODB_URL, { dbName: "UXPlorer" });
    console.log("connected to database");
  } catch (error) {
    console.error(error);
  }
}

module.exports = mongooseLoader;
