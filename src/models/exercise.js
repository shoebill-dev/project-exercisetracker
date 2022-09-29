const mongoose = require("mongoose");
require("../db/mongoose");

const exerciseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
