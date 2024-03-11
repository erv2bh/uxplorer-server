const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  testUrl: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  missions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mission",
    },
  ],
  testers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tester",
    },
  ],
});

module.exports = mongoose.model("Test", testSchema);
