const mongoose = require('mongoose');
require('../db/mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
});

userSchema.set('toObject', {virtuals: true});
userSchema.set('toJSON', {virtuals: true});

userSchema.virtual('exercises', {
  ref: 'Exercise',
  localField: '_id',
  foreignField: 'owner',
});

const User = mongoose.model('User', userSchema);

module.exports = User;
