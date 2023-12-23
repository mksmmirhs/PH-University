import nodemailer from 'nodemailer';
import config from '../config';
export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.APP_ENV === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'mksmmi40@gmail.com',
      pass: 'sydf pbuv oabx dkvf',
    },
  });

  await transporter.sendMail({
    from: 'mksmmi40@gmail.com', // sender address
    to, // list of receivers
    subject: 'password reset withing 10 mins', // Subject line
    text: 'Hello? password forgot?', // plain text body
    html, // html body
  });
};
