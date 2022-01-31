var nodemailer = require("nodemailer");
require("dotenv").config();
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_ID,
    pass: process.env.USER_PASS,
  },
});

const sendingMail = (site, to_email, error_message) => {
  var mailOptions = {
    from: "tudotech91@gmail.com",
    to: to_email,
    subject: "Website down notification",
    html: `<h1 style="font-weight:bold; color:red;">Site: ${site} not Running </h1>
    <p>Please check your site! It's not running properly</p>
    <p>Error message : ${error_message}</p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
module.exports = sendingMail;
