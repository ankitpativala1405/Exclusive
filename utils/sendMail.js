const nodemailer = require("nodemailer");
require("dotenv").config();

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ankitj1405@gmail.com",
    pass: "rvjuxslhmrcusjxl",
  },
});

const sendMail = async (to, subject, html) => {
  return new Promise((resolve, reject) => {
    let mailOptions = {
      from: process.env.email,
      to,
      subject,
      html,
    };
    transport.sendMail(mailOptions, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

module.exports = sendMail;
