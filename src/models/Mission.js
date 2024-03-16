const mongoose = require("mongoose");

const missionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  expectedDuration: {
    type: Number,
    required: true,
  },
  order: {
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
      },
      completedAt: {
        type: Date,
      },
      feedback: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Mission", missionSchema);
