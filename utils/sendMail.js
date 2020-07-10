const nodemailer = require("nodemailer");
const catchAsyn = require("./../utils/catchAsync");

module.exports = catchAsyn(async (opt) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD,
      }, tls: {
          rejectUnauthorized: false
      }
  });

  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: opt.email,
    subject: `Thank you for contacting us regarding ${opt.subject}`,
    text: `Hi ${opt.name}, Thank you for contacting Us, our team will getback to you as soon as possible`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
});
