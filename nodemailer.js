var nodemailer = require('nodemailer');

var sender = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'noreply.findmyjob@gmail.com',
        pass: 'jobfinder'
    }
});

module.exports = sender;
