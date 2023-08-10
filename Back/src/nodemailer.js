const nodemailer = require("nodemailer");

const{NODEMAILER_HOST, NODEMAILER_PORT, EMAIL, PASSWORD_EMAIL} = process.env;

const transporter = nodemailer.createTransport({
    host: NODEMAILER_HOST,
    port: NODEMAILER_PORT,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: EMAIL,
      pass: PASSWORD_EMAIL
    }
  });

  module.exports = transporter;