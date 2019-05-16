const Technology = require('../models/mongo-models/technology');

exports.index = function (req, res) {
  Technology.find({}, function (err, technologies) {
    return res.status(200).json(technologies);
  }).catch(err => {
    return res.status(500).json({ errors: 'Error fetching technologies' });
  });
}
