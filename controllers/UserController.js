const models = require('../models/mysql-models');
const User = require('../models/mongo-models/user');
const Vacancy = require('../models/mongo-models/vacancy');

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

exports.update = function (req, res) {
  models.User.findOne({
    where: { id: req.user.id }
  }).then(credentials => {
    credentials.update({
      password: req.body.password || credentials.password
    }).then(credentials => {
      User.findOneAndUpdate({
        _id: credentials.id,
      },
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        avatar: req.body.avatar,
        age: req.body.age,
        phone: req.body.phone,
        technology: req.body.technology === undefined ? "" : JSON.parse(req.body.technology),
        github_link: req.body.github_link,
        bio: req.body.bio,
        location: req.body.location,
        looking_for_job: req.body.looking_for_job,
      },
      {
        omitUndefined: true,
      }, function(error, result){
        return res.status(200).json({ data: 'User profile updated.' });
      });
    }).catch(err => {
      return res.status(500).json({ errors: 'Error updating user profile' });
    });
  });
};

exports.show = function (req, res) {
  models.User.findOne({
    where: { id: req.user.id }
  }).then(user => {
    let credentials = user.dataValues;
    User.findById(user.id, function (err, profile) {
      return res.status(200).json({credentials, profile});
    });

  }).catch(err => {
    console.log(err);
    return res.status(500).json({ errors: 'Error fetching user profile' });
  });
}

exports.createdVacancies = function (req, res, next) {
  Vacancy.find({
    user_created_id: req.user.id
  }, function (err, vacancies) {
    if (vacancies == []) {
      return res.status(204).json();
    }
    else {
      return res.status(200).json(vacancies);
    }
  }).catch(err => {
    return res.status(500).json({ errors: "Internal Server Error." });
  });
}
