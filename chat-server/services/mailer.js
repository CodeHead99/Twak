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
        user: "artvision1807@gmail.com",
        pass: "xsmtpsib-5f52e0fcbd6474c3337955e397465a6b7ee01957b65804956a7a81a5e9937b59-fHn5dEgQqAbFY3PN",
      },
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: sender,
      to: recipient,
      subject: subject,
      text: text,
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
