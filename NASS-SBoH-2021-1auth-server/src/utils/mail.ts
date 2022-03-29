import nodemailer from 'nodemailer';
import '../config/dotenv';
/**
 * @description send email a to with subject and contenent text o html
 * @param {string} to 
 * @param {string} subject 
 * @param {string} text 
 * @param {string} html 
 */
const sendMail = async (to:string, subject:string, text:string, html:string) => {
    try {
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASSWD
            }
          });
          var opt = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            text: text,
            html: html
          }
          await transporter.sendMail(opt)
          return true;
    } catch (error) {
      console.log(error)
        return false;
    }

}

export default sendMail;