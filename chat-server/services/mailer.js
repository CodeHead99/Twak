const nodemailer = require("nodemailer");
const sendSGMail = async ({
  recipient,
  sender,
  subject,
  html,
  attachments,
  text,
}) => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS,
      },
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: sender,
      to: recipient,
      subject: subject,
      text: text,
      html: html,
    });
    console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};
exports.sendEmail = async (args) => {
  if (!process.env.NODE_ENV === "development") {
    return Promise.resolve();
  } else {
    return sendSGMail(args);
  }
};
