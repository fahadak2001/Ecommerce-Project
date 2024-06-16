const nodemailer = require("nodemailer");

const Transport = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.email,
    pass: process.env.password,
  },
});

module.exports = Transport;
