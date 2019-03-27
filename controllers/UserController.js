var models = require('../models/mysql-models');
const bcrypt = require('bcrypt');
const passport = require('passport');
var jwt = require('jwt-simple');

exports.activate = function (req, res, next) {
  return models.User.findOne({
    where: { activation: req.params.activation_id }
  }).then(user => {
    user.status = 1;
    user.activation = "";
    user.save().then(() => { return res.status(200).json({ data: 'Account activated' }) });
  }).catch(err => {
    return res.status(400).json({ errors: 'Invalid activation string' });
  });

}
