const express = require('express');
const bodyParser = require('body-parser');
const Exercise = require('../models/exercise');
const User = require('../models/user');

const router = new express.Router();
const urlEncodedParser = bodyParser.urlencoded({extended: false});

router.use(urlEncodedParser);

router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/api/users', async (req, res) => {
  try {
    const {username} = req.body;
    const user = new User({username});
    await user.save();
    res.status(200).json({username: user.username, _id: user.id});
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/api/users/:_id/exercises', async (req, res) => {
  try {
    const {_id} = req.params;
    const {description, duration, date} = req.body;
    const exercise = new Exercise(
        {owner: _id,
          description,
          duration,
          date: (date) ? date : Date.now(),
        });
    await exercise.save();
    const user = await User.findById(_id).populate('exercises').exec();
    console.log(user.exercises);
    const response = {
      username: user.username,
      description,
      duration,
      date: exercise.date.toDateString(),
      _id,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/api/users/:_id/logs', async (req, res) => {
  try {
    const {_id} = req.params;
    const {from, to, limit} = req.query;
    const fromDate = from ? new Date(from) : new Date(-8640000000000000);
    const toDate = to ? new Date(to) : new Date(8640000000000000);
    const user = await User.findById(_id)
        .populate({
          path: 'exercises',
          limit,
          match: {date: {$gte: fromDate, $lte: toDate}},
        })
        .exec();

    const count = user.exercises.length;

    const responseExercises = user.exercises.map((exercise) => {
      return {
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date.toDateString(),
      };
    });

    const response = {
      _id: user._id,
      username: user.username,
      count,
      log: responseExercises,
    };

    // console.log(response);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
