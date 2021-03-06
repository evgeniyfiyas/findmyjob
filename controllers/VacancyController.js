const models = require('../models/mysql-models');
const Vacancy = require('../models/mongo-models/vacancy');
const mongoose = require('mongoose');
const host = require('../config/swagger-config').swaggerDefinition.host;
const urlParser = require('url');

exports.store = function (req, res) {
  models.User.findOne({
    where: {
      id: req.user.id
    }
  }).then(user => {
    // getting logo filename
    let logo_filename;
    if (req.file == undefined) {
      logo_filename = "nologo.png";
    } else {
      logo_filename = req.file.filename;
    }
    let data = {
      _id: new mongoose.Types.ObjectId(),
      user_created_id: req.user.id,
      email: req.body.email,
      location: req.body.location,
      logo: 'http://' + host + '/api/uploads/' + logo_filename,
      header: req.body.header,
      technology: req.body.technology === undefined ? "" : {
        name: req.body.name,
        level: req.body.technology.level
      },
      body: req.body.body,
      experience_required: req.body.experience_required,
    };
    console.log(data);
    let vacancy = new Vacancy({
      _id: new mongoose.Types.ObjectId(),
      user_created_id: req.user.id,
      email: req.body.email,
      location: req.body.location,
      logo: 'http://' + host + '/api/uploads/' + logo_filename,
      header: req.body.header,
      technology: req.body.technology === undefined ? "" : [{
        name: req.body.name,
        level: req.body.technology.level
      }],
      body: req.body.body,
      experience_required: req.body.experience_required,
    });
    vacancy.save();
    return res.status(200).json({
      msg: 'ok'
    });
  }).catch(err => {
    console.error(err);
    return res.status(500).json({
      errors: 'Error storing vacancy'
    });
  });
}

exports.update = function (req, res) {
  let logo_filename;
  if (req.file == undefined) {
    logo_filename = undefined;
  } else {
    logo_filename = 'http://' + host + '/api/uploads/' + req.file.filename;
  }
  Vacancy.findOneAndUpdate({
    _id: req.params.id
  }, {
    location: req.body.location,
    email: req.body.email,
    logo: logo_filename,
    header: req.body.header,
    technology: req.body.technology === undefined ? "" : JSON.parse(req.body.technology),
    body: req.body.body,
    experience_required: req.body.experience_required,
  }, {
    omitUndefined: true,
  }, function (error, result) {
    if (result === undefined) {
      return res.status(400).json({
        errors: 'Vacancy with such id not found.'
      });
    } else {
      if (req.user.id != result.user_created_id) {
        return res.status(401).json({
          errors: 'Unauthorized.'
        });
      } else {
        return res.status(200).json({
          data: 'Vacancy updated.'
        });
      }
    }
  }).catch(err => {
    return res.status(500).json({
      errors: 'Error updating vacancy'
    });
  });
};

exports.index = function (req, res) {
  Vacancy.find({}, function (err, vacancies) {
    return res.status(200).json(vacancies);
  }).catch(err => {
    return res.status(500).json({
      errors: 'Error fetching vacancies'
    });
  });
}

exports.filter = function (req, res) {
  let filter = {};
  req.body.location ? filter.location = req.body.location : '';
  req.body.experience_required ? filter.experience_required = req.body.experience_required : '';
  Vacancy.find(filter).then(vacancies => {
    if (req.body.technology) {
      let result = [];
      filter.technology = req.body.technology;
      vacancies.forEach(el => {
        let find = false;
        el.technology.forEach(tech => {
          for (let i = 0; i < filter.technology.length; i++) {
            if (!find && tech.name === filter.technology[i].name && tech.level === filter.technology[i].level) {
              result.push(el);
              find = true;
            }
          }
        })
      })
      return result;
    }
    return vacancies;
  }).then(vacancies => {
    if (vacancies.length > 0) {
      res.status(200).json(vacancies);
    } else {
      res.status(204).send({
        msg: 'No availiable vacations'
      });
    }
  }).catch(err => {
    res.status(500).json({
      errors: 'Error fetching vacancies'
    });
  });
}

exports.search = function (req, res) {
  let query = urlParser.parse(req.url).query.split('=')[1];
  Vacancy.find().then(vacancies => {
    let result = [];
    vacancies.forEach(el => {
      if (el.header.indexOf(query) > 0 || el.body.indexOf(query) > 0)
        result.push(el);
    })
    console.log(result);
    return result;
  }).then(vacancies => {
    if (vacancies.length > 0) {
      res.status(200).send(vacancies);
    } else {
      res.status(204).send({
        msg: 'No availiable vacations'
      });
    }
  }).catch(err => {
    res.status(500).json({
      errors: 'Error fetching vacancies'
    });
  })
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
  }, function (err, vacancy) {
    if (req.user.id != vacancy.user_created_id) {
      return res.status(401).json({
        errors: 'Unauthorized.'
      });
    } else {
      vacancy.remove().then(() => {
        return res.status(204).json();
      })
    }
  }).catch(err => {
    console.log(err);
    return res.status(422).json({
      errors: 'Invalid vacancy id'
    });
  });
}
