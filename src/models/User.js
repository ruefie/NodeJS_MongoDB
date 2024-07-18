const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  age: { type: Number, required: true },
  active: { type: Boolean, default: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
