//require("dotenv").config();
const nodemailer = require("nodemailer");
const config = require("../config/gmailconfig");

const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
    user : user,
    pass : pass,
  },
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
  transport.sendMail({
    from: user,
    to: email,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for joining CodeoneXd. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:5000/signup/confirm/${confirmationCode}> Click here</a>
        </div>`,
  }).catch(err => console.log(err));
};