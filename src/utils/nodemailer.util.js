const nodemailer = require('nodemailer');
const services = require('../constants/services.constants');
const { email_out } = require('../config/services.config');

const transport = nodemailer.createTransport({
  service: services.EMAIL,
  port: services.EMAIL_PORT,
  secure: true, // use SSL
  auth: {
    user: email_out.identifier,
    pass: email_out.password,
  },
});

module.exports = transport;
