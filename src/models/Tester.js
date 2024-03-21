const mongoose = require("mongoose");

const testerSchema = new mongoose.Schema({
  testerEmail: {
    type: String,
    required: true,
  },
  testerId: {
    type: String,
    required: true,
    unique: true,
  },
  testerPassword: {
    type: String,
    required: true,
  },
  isLoggedIn: {
    type: Boolean,
    required: true,
    default: false,
  },
  missions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mission",
    },
  ],
  s3Key: {
    type: String,
  },
  surveyResponse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Survey",
  },
});

module.exports = mongoose.model("Tester", testerSchema);
