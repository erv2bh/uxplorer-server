const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  createdTests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
