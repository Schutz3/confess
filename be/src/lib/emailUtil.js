import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false,
    minVersion: 'TLSv1.2',
  },
});
const url = process.env.FE_URL;
const App = process.env.APP_NAME;

export const sendEmail = async (email, message) => {
  const mailOptions = {
    from: process.env.APP_NAME +'<' + process.env.EMAIL_USER + '>',
    to: email,
    subject: `Hey someone sent you a message`,
    text: `Hey there!, here is the message\n\n===================\n\n${message}\n\n===================\n\nSent from ${App} at ${url} - ${new Date().toLocaleString()}\n\nTo report abuse, please contact us at report@scz.my.id`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Hey there!</h2>
        <p>Here is the message:</p>
        <div style="background-color: #f0f0f0; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        <hr style="border: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 0.9em; color: #666;">
          Sent from ${App} at <a href="${url}" style="color: #0066cc; text-decoration: none;">${url}</a><br>
          ${new Date().toLocaleString()}
        </p>
        <p style="font-size: 0.8em; color: #999;">
          To report abuse, please contact us at <a href="mailto:report@scz.my.id" style="color: #0066cc; text-decoration: none;">report@scz.my.id</a>
        </p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};