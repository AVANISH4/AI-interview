import nodemailer from 'nodemailer';

export const sendEmailNotification = async ({ to, subject, htmlText }) => {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'AI Interview Pro <noreply@aiinterviewpro.com>',
        to,
        subject,
        html: htmlText
      });
      console.log(`Email successfully dispatched to ${to}`);
      return true;
    } catch (err) {
      console.warn('Nodemailer failed, logging email to console:', err.message);
    }
  }

  // Simulated Email Logger
  console.log(`[SIMULATED EMAIL DISPATCH] To: ${to} | Subject: ${subject}`);
  return true;
};
