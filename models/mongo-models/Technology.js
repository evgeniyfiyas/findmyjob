const mongoose = require('mongoose');

const technologySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String
});

module.exports = mongoose.model('Technology', technologySchema);
