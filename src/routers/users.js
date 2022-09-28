const express = require("express");
const bodyParser = require("body-parser");
const User = require("../models/user");
const Exercise = require("../models/exercise");

const router = new express.Router();
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

router.use(urlEncodedParser);

router.post("/api/users", async (req, res) => {
  try {
    const { username } = req.body;
    const user = new User({ username });
    await user.save();
    res.status(200).json({ username: user.username, _id: user.id });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/api/users/:_id/exercises", async (req, res) => {
  try {
    const { _id } = req.params;
    const { description, duration, date } = req.body;
    const exercise = new Exercise({ owner: _id, description, duration, date });
    await exercise.save();
    const user = await User.findById(_id);
    const response = {
      username: user.username,
      description,
      duration,
      date,
      _id,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
