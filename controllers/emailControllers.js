const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, 
  auth: {
    user: process.env.SMTP_MAIL, 
    pass: process.env.SMTP_PASSWORD, 
  },
});

const sendEmail = expressAsyncHandler(async (req, res) => {
    const { email, subject, message } = req.body;
   // console.log(email, subject, message);
  
    var mailOptions = {
      from: email,
      to: process.env.SMTP_MAIL,
      subject: subject,
      text: message,
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        
        return res.status(500).json({ message: "Failed to send email", error: error.message });
      } else {
        console.log("Email sent successfully!");
       
        return res.status(200).json({ message: "Email sent successfully!" });
      }
    });
  });

module.exports = { sendEmail };