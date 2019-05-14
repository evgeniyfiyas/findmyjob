var models = require('../models/mysql-models');
const { check, validationResult } = require('express-validator/check');
const config = require(__dirname + '/../config/app-config');
const bcrypt = require('bcrypt');
const passport = require('passport');
var jwt = require('jwt-simple');


exports.login = function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  return models.User.findOne({
    where: { email: req.body.email }
  }).then(user => {
    bcrypt.compare(req.body.password, user.password).then(function(result) {
      if (result) {
        if (user.status == 0) {
          return res.status(403).json({ errors: 'Account is not activated.' });
        } else {
          let token = jwt.encode(user, config.jwtsecret);
          return res.status(200).json({ msg: "ok", token: token });
        }
      } else {
        return res.status(401).json({ errors: 'Incorrect email or password' });
      }
    }).catch(err => {
      return res.status(500).json({ errors: 'Internal server error' });
    });
  }).catch(err => {
    return res.status(401).json({ errors: 'Incorrect email or password' });
  });
};

exports.validate = [
  check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be a valid email.'),

  check('password')
    .exists()
    .withMessage('Password is required.'),
];
