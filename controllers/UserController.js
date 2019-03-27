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

exports.update = function (req, res, next) {
  // TODO: Integrate with mongoDB UserProfile model and update it here
  return models.User.findOne({
    where: { id: req.user.id }
  }).then(user => {
    user.update({
      password: req.body.password || user.password
    }).then(() => {
      return res.status(200).json({ data: 'User profile updated.' })
    });
  }).catch(err => {
    return res.status(500).json({ errors: 'Error updating user profile' });
  });
}

exports.show = function (req, res, next) {
  // TODO: Integrate with mongoDB UserProfile model and show it here
  return models.User.findOne({
    where: { id: req.user.id }
  }).then(user => {
      return res.status(200).json({ user })
  }).catch(err => {
    return res.status(500).json({ errors: 'Error fetching user profile' });
  });
}
