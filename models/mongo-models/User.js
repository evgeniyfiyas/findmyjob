const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: Number,
  firstname: String,
  lastname: String,
  avatar: String,
  age: Number,
  phone: String,
  github_link: String,
  technology: [{
    name : String,
    level : String
  }],
  bio: String,
  location: String,
  looking_for_job: Boolean,
});

module.exports = mongoose.model('User', userSchema);
