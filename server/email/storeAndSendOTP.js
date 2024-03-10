

const nodemailer = require("nodemailer");
// const otp = require('./generateOTP');
// const generateOTP = require("./generateOTP");


const { AUTH_EMAIL, AUTH_PASS } = process.env;
let transporter = nodemailer.createTransport({
   host: "smtp-mail.outlook.com",
 
            // port: 2525,
            // secure: false,
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASS,
  },
});

// test transporter

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready For Messages");
    console.log(success);
  }
});

const sendEmail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    return;
  } catch (error) {
    throw error;
  }
};

// sendEmail(mailOptions)
// send email


module.exports = sendEmail;