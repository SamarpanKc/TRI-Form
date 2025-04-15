import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { email, firstName, lastName } = await request.json();

    if (!email || !firstName || !lastName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Helps avoid TLS issues in some environments
      },
    });

    // Email content
    const mailOptions = {
      from:`TRI Workshop Team ${process.env.EMAIL_USER}`,
      to: email,
      subject: "Workshop Registration Confirmation",
      text: `Hello ${firstName} ${lastName},\n\nThank you for registering for our workshop! We have received your registration and we're excited to have you join us.\n\nWorkshop Date: [Insert Workshop Date Here]\nWorkshop Time: 7:00 to 8:00 PM\nMeeting Link: [Insert Meeting Link Here]\nOur Facebook Page: [Insert Facebook Page Link Here]\n\nBest regards,\nTRI (Tech Research and Innovation)`,
      html: `
    <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light only">
  <title>Workshop Registration Confirmation</title>
  <style>
    /* Force light mode for all clients */
    body, table, td, p, a, li, blockquote {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      color: #333333 !important;
    }
    body {
      background-color: #ffffff !important;
      margin: 0 !important;
      padding: 0 !important;
      -webkit-text-size-adjust: 100% !important;
      -ms-text-size-adjust: 100% !important;
      -webkit-font-smoothing: antialiased !important;
    }
    .container {
      background-color: #ffffff !important;
      color: #333333 !important;
      border: 1px solid #e0e0e0 !important;
    }
    h2 {
      color: #001b45 !important;
    }
    .content-text {
      color: #333333 !important;
    }
    .highlight {
      color: #001b45 !important;
      font-weight: bold;
    }
    /* Force links to be colored correctly */
    a {
      color: #001b45 !important;
      text-decoration: underline;
    }
    .footer-text {
      color: #777777 !important;
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f7f7f7; color: #333333;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f7f7f7">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%;" class="container">
          <!-- Header with logo -->
          <tr>
            <td align="center" style="background-color: #001b45; padding: 20px;">
              <h1 style="color: #ffffff !important; margin: 0;">TRI Workshop</h1>
            </td>
          </tr>
          <!-- Main content -->
          <tr>
            <td align="left" style="padding: 30px; background-color: #ffffff !important;">
              <h2 style="margin-top: 0; margin-bottom: 24px; font-size: 24px; text-align: center;" class="highlight">Registration Confirmation</h2>
              
              <p style="margin-top: 0; margin-bottom: 15px; text-align: left;" class="content-text">Hello <strong class="highlight">${firstName} ${lastName}</strong>,</p>
              
              <p style="margin-top: 0; margin-bottom: 20px; line-height: 1.5; text-align: left;" class="content-text">Thank you for registering for our workshop! We have received your registration and we're excited to have you join us.</p>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px; background-color: #f9f9f9; border-radius: 5px; padding: 15px;">
                <tr>
                  <td style="padding-bottom: 10px;">
                    <strong>Date:</strong> <span class="content-text">20th to 30th April, 2025</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 10px;">
                    <strong>Time:</strong> <span class="content-text">7:00 to 8:00 PM</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 10px;">
                    <strong>G-Meet Link:</strong> <a href="[Insert Meeting Link Here]" style="color: #001b45;">Click Here to Join</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Facebook Page:</strong> <a href="https://www.facebook.com/profile.php?id=61566885262328" style="color: #001b45;">Follow for more updates</a>
                  </td>
                </tr>
              </table>

              <p style="margin-top: 0; margin-bottom: 25px; font-size: 14px; text-align: left;" class="content-text">We will send you further details about the workshop schedule and any necessary preparations closer to the date.</p>
              
              <!-- Call to action button -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://calendar.google.com/calendar/" style="background-color: #001b45; color: #ffffff !important; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Add to Calendar</a>
              </div>
              
              <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
              
              <p style="margin-top: 0; margin-bottom: 0; font-size: 14px; text-align: center;" class="footer-text">Best regards,</p>
              <p style="margin-top: 5px; margin-bottom: 0; font-size: 14px; text-align: center;" class="footer-text">TRI (Tech Research and Innovation)</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="background-color: #f3f3f3; padding: 15px;">
              <p style="margin: 0; font-size: 12px;" class="footer-text">© 2025 TRI Workshop. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    };

    // Log attempt for debugging
    console.log("Attempting to send email to:", email);

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Email API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
