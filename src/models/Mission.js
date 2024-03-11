const mongoose = require("mongoose");

const missionSchema = new mongoose.Schema({
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  expectedDuration: {
    type: Number,
    required: true,
  },
  completedBy: [
    {
      tester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tester",
      },
      completed: {
        type: Boolean,
        default: false,
      },
      duration: {
        type: Number,
      },
      createdAt: {
        type: Date,
        required: true,
      },
      completedAt: {
        type: Date,
        required: true,
      },
      feedback: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Mission", missionSchema);
