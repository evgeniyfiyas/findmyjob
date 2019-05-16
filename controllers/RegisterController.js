var models = require('../models/mysql-models');
const {
  check,
  validationResult
} = require('express-validator/check');
const config = require(__dirname + '/../config/app-config');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
var mailer = require('../nodemailer');
const User = require('../models/mongo-models/user');


exports.register = function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }

  models.User.create({
    email: req.body.email,
    password: req.body.password,
  }).then(user => {
    var mailOptions = {
      to: user.email,
      subject: 'FindMyJob: Activation link',
      html: '<p>Your activation link: <a>http://findmyjob.tk/api/user/activate/' + user.activation + '</a></p>'
    };

    mailer.sendMail(mailOptions, function(err, info) {
      if (err)
        console.log(err)
      else
        console.log(info);
    });
    
    let userProfile = new User({
      _id: user.id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      avatar: "null",
      age: req.body.age,
      phone: req.body.phone,
      technology: JSON.parse(req.body.technology),
      github_link: req.body.github_link,
      bio: req.body.bio,
      location: "null",
      looking_for_job: req.body.looking_for_job,
    });
    userProfile.save();

    return res.status(200).json({
      data: 'User created',
      activation_token: user.activation
    });
  });

};

exports.validate = [
  check('email')
  .trim()
  .normalizeEmail()
  .isEmail()
  .withMessage('Must be a valid email.')
  .custom(email => {
    return models.User.findOne({
      where: {
        email: email
      }
    }).then(user => {
      if (user != null) throw new Error('E-mail already in use');
    })
  }),

  check('password')
  .trim()
  .isLength({
    min: 6
  })
  .withMessage('Password must be at least 6 characters in length.')
  .custom((password, {
    req,
    location,
    path
  }) => {
    if (password !== req.body.passwordConfirmation) {
      throw new Error("Passwords don't match");
    } else {
      return password;
    }
  }),

];
