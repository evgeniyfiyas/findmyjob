const mongoose = require('mongoose');

const vacancySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  location: String,
  logo: String,
  header: String,
  technology: [{
    name : String,
    level : String
  }],
  body: String,
  experience_required: Boolean
});

module.exports = mongoose.model('Vacancy', vacancySchema);
