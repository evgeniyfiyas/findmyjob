const models = require('../models/mysql-models');
const Vacancy = require('../models/mongo-models/vacancy');
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const passport = require('passport');
var jwt = require('jwt-simple');


exports.store = function (req, res) {
  models.User.findOne({
    where: {
      id: req.user.id
    }
  }).then(user => {
    let vacancy = new Vacancy({
      _id: new mongoose.Types.ObjectId(),
      user_created_id: req.user.id,
      location: req.body.location,
      logo: req.body.logo,
      header: req.body.header,
      technology: req.body.technology === undefined ? "" : JSON.parse(req.body.technology),
      body: req.body.body,
      experience_required: req.body.experience_required,
    });
    vacancy.save();
    return res.status(200).json({ msg: 'ok' });
  }).catch(err => {
    return res.status(500).json({
      errors: 'Error storing vacancy'
    });
  });
}

exports.update = function (req, res) {
    Vacancy.findOneAndUpdate({
        _id: req.params.id
      },
      {
        location: req.body.location,
        logo: req.body.logo,
        header: req.body.header,
        technology: req.body.technology === undefined ? "" : JSON.parse(req.body.technology),
        body: req.body.body,
        experience_required: req.body.experience_required,
      },
      {
        omitUndefined: true,
      }, function(error, result){
        if (result === undefined) {
          return res.status(400).json({ errors: 'Vacancy with such id not found.' });
        }
        else {
          if (req.user.id != result.user_created_id) {
            return res.status(401).json({ errors: 'Unauthorized.' });
          }
          else {
            return res.status(200).json({ data: 'Vacancy updated.' });
          }
        }
      }).catch(err => {
      return res.status(500).json({ errors: 'Error updating vacancy' });
    });
};

exports.index = function (req, res) {
  Vacancy.find({}, function (err, vacancies) {
    return res.status(200).json(vacancies);
  }).catch(err => {
    return res.status(500).json({ errors: 'Error fetching vacancies' });
  });
}

exports.show = function (req, res) {
  Vacancy.find({
      _id: req.params.id,
    })
    .exec()
    .then(data => {
      return res.status(200).json({
        data: data
      });
    })
    .catch(err => {
      return res.status(422).json({
        errors: 'Invalid vacancy id'
      });
    })
}

exports.remove = function (req, res) {
  Vacancy.findOne({
      _id: req.params.id,
    }, function(err, vacancy) {
      if (req.user.id != vacancy.user_created_id) {
        return res.status(401).json({ errors: 'Unauthorized.' });
      }
      vacancy.remove().then(() => {
        return res.status(204).json();
     });
    }).catch(err => {
      console.log(err);
      return res.status(422).json({
        errors: 'Invalid vacancy id'
      });
    });
}
