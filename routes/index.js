var express = require('express');
var router = express.Router();
let userProfile = require('../models/mongo-models/userProfile');
userProfile.connect();

// let user = {
//   "PersonID": 1001,
//   "PersonName": "john simon",
//   "Gender": "Male",
//   "DOB": "1997-8-1",
//   "Addresses": [{
//     "AddressID": 1,
//     "AddressType": "Permanent",
//     "AddressLine1": "101/4",
//     "AddressLine2": "sundar nagar",
//     "Area": "kalina",
//     "Locality": "Santacruz(east)",
//     "City": "Mumbai",
//     "State": "Maharashtra",
//     "Country": "India",
//     "PostalCode": "400055"
//   }],
//   "ContactNumbers": [{
//     "ContactID": 1,
//     "ContactType": "Home",
//     "ContactNumber": {
//       "CountryCode": "+91",
//       "RegionCode": "022",
//       "PhoneNumber": "700383555"
//     }
//   }],
//   "Email": [{
//     "EmailID": 1,
//     "EmailType": "johnxyz@gmail.com"
//   }],
//   "Skills": [{
//     "SkillId": 1,
//     "SkillName": "Node.js",
//     "SkillLevel": "high"
//   }],
//   "Educations": [{
//     "EducationId": 1,
//     "Name": "GRSU",
//     "StartDate": "2016-01-01",
//     "FinishDate": "2020-01-01",
//     "ProfessionName": "POIT"
//   }],
//   "SocialNetworks": [{
//     "SocialId": 1,
//     "Name": "Skype",
//     "Login": "SkypeName"
//   }]
// };


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
