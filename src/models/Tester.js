const mongoose = require("mongoose");

const testerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  participatedTests: [
    {
      testerId: {
        type: String,
        required: true,
        unique: true,
      },
      testerPassword: {
        type: String,
        required: true,
      },
      testId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
      },
      videoURL: {
        type: String,
      },
      surveyResponse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Survey",
      },
    },
  ],
});

module.exports = mongoose.model("Tester", testerSchema);
