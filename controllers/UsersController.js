var models = require('../models/mysql-models');
const { check, validationResult } = require('express-validator/check');
const config = require(__dirname + '/../config/app-config');
const bcrypt = require('bcrypt');
const crypto = require('crypto');


exports.getById = function (req, res) {
  models.User.findByPk(req.params.id).then(user => {
    if (user == null) {
      return res.status(422).json({ errors: [{
        title: "User does not exist",
      }]});
    }
    else {
      return res.status(200).json(user);
    }
  });
};

exports.register = function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  bcrypt.hash(req.body.password, config.userPasswordSaltRounds, function (err, hash) {
    models.User.create({
      email: req.body.email,
      password: hash,
      status: 0,
      activation: crypto.randomBytes(20).toString('hex'),
    }).then(user => {
      return res.status(200).json({ data: 'User created' });
    });
  });
};

exports.registerValidate = [
  check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be a valid email.')
    .custom(email => {
      return models.User.findOne({ where: { email: email } }).then(user => {
        if (user != null) throw new Error('E-mail already in use');
      })
    }),

  check('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters in length.')
    .custom((password, { req, location, path }) => {
      if (password !== req.body.passwordConfirmation) {
        throw new Error("Passwords don't match");
      }
      else {
        return password;
      }
    }),

];
