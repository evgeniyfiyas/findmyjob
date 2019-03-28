'use strict';

const db = require("../../db/mongoDb");
const mongoConfig = require("../../migrations/migrate-mongo-config");

exports.connect = () => {
  db.connect(mongoConfig.mongodb.url, (err) => {
    if (err) {
      return console.log(err);
    }
  })
}
exports.all = (cb) => {
  db.get().collection('userProfiles').find().toArray((err, result) => {
    cb(err, result);
  });
};

exports.findById = (id, cb) => {
  db.get().collection('userProfiles').findOne({ ProfileId: id }, (err, acc) => {
    cb(err, acc);
  });
}
exports.create = (userProfile, cb) => {
  db.get().collection("userProfiles").insertOne(userProfile, (err, result) => {
    cb(err, result);
  })
};

exports.update = (id, userProfile, cb) => {
  db.get().collection("userProfiles").updateOne({ ProfileId: id }, userProfile, (err, result) => {
    cb(err, result);
  })
};

exports.delete = (id, cb) => {
  db.get().collection("userProfiles").deleteOne({ ProfileId: id }, (err, result) => {
    cb(err, result);
  })
};