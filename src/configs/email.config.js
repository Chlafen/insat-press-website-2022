const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 456,
  service: 'gmail',
  secure: false,
  auth: {
    user: process.env.M_MAIL,
    pass: process.env.M_PASS,
  },
  debug:false,
  logger: true,
});

 
module.exports = transporter;