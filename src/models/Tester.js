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
  missions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mission",
    },
  ],
  videoURL: {
    type: String,
  },
  surveyResponse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Survey",
  },
});

module.exports = mongoose.model("Tester", testerSchema);
