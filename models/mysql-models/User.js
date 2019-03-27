'use strict';
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const config = require(__dirname + '/../../config/app-config');


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.INTEGER,
    activation: DataTypes.STRING
  }, {});
  User.beforeCreate((user, options) => {
    return bcrypt.hash(user.password, config.userPasswordSaltRounds).then(hash => {
      user.password = hash;
      user.activation = crypto.randomBytes(20).toString('hex');
    });
  });
  User.beforeUpdate((user, options) => {
    if (user.changed('password')) {
      return bcrypt.hash(user.password, config.userPasswordSaltRounds).then(hash => {
        user.password = hash;
      });
    }
  });
  return User;
};
