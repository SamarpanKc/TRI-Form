import nodemailer from 'nodemailer';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, firstName, lastName } = req.body;

    // Create a transporter using Gmail service
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email address from .env
        pass: process.env.EMAIL_PASS, // Your email password from .env
      },
    });

    // Mail options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: email, // Recipient's email
      subject: "Workshop Registration Confirmation", 
      text: ``, 
      html: `
        <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Workshop Registration Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px;">
          <tr>
            <td align="center" bgcolor="#001b45" style="padding: 30px 40px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-family: Arial, sans-serif;">Workshop Registration Confirmed</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px; font-family: Arial, sans-serif;">
              <p style="font-size: 16px; color: #001b45; margin: 0 0 20px;">Hello <strong>${firstName} ${lastName}</strong>,</p>
              <p style="font-size: 16px; color: #333333; margin: 0 0 20px;">
                Thank you for registering for our workshop! We have received your registration and we're excited to have you join us.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0; background-color: #f9f9f9; border-left: 4px solid #4a6bff;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="font-size: 18px; color: #333333; margin: 0 0 10px;">What's Next?</h3>
                    <p style="font-size: 16px; color: #555555; margin: 0;">
                      We will send you more details about the workshop schedule and requirements closer to the event date.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="font-size: 16px; color: #333333; margin: 0 0 20px;">
                If you have any questions, feel free to reply to this email.
              </p>

              <p style="font-size: 16px; color: #333333; margin: 0;">
                Best regards,<br><strong>TRI (Teach Research and Innovation) Team</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td bgcolor="#f5f5f5" style="padding: 20px; text-align: center; font-family: Arial, sans-serif; border-top: 1px solid #eeeeee;">
              <p style="margin: 0; font-size: 14px; color: #777777;">© 2025 Teach Research and Innovation. All rights reserved.</p>
              <p style="margin: 10px 0 0;"><a href="#" style="font-size: 14px; color: #4a6bff; text-decoration: none;">Privacy Policy</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `
    };

    try {
      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Email sent successfully', info });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}