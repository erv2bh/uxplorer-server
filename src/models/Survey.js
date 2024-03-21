const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema({
  tester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tester",
    required: true,
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: true,
  },
  SUS: [
    {
      type: Number,
      required: true,
    },
  ],
  NPS: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Survey", surveySchema);
