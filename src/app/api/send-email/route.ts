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
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 16px; color: #f7f5fb;">
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table cellpadding="0" cellspacing="0" border="0" style="max-width: 800px; width: 100%; background-color: none; border: 1px solid #ddd; border-radius: 5px;">
            <tr>
              <td align="left" style="padding: 30px;">
                <h2 style="color: #001b45; margin-top: 0; margin-bottom: 34px; font-size: 24px; text-align: center;">TRI Workshop Registration Confirmation</h2>
                <p style="margin-top: 0; margin-bottom: 15px; text-align: left; color: #001b45;">Hello <strong style="font-weight: bold; color: #001b45;">${firstName} ${lastName}</strong>,</p>
                <p style="margin-top: 0; margin-bottom: 20px; line-height: 1.5; text-align: left;">Thank you for registering for our workshop! We have received your registration and we're excited to have you join us.</p>

                <p style="margin-top: 0; margin-bottom: 10px; text-align: left;">
                  <strong>Date:</strong> <span style="color: #555;">20th to 30th April, 2025</span>
                </p>
                <p style="margin-top: 0; margin-bottom: 10px; text-align: left;">
                  <strong>Time:</strong> <span style="color: #555;">7:00 to 8:00 PM</span>
                </p>
                <p style="margin-top: 0; margin-bottom: 10px; text-align: left;">
                  <strong>G-Meet Link:</strong> <a href="[Insert Meeting Link Here]" style="color: #001b45; text-decoration: underline;">Click Here to Join</a>
                </p>
                <p style="margin-top: 0; margin-bottom: 20px; text-align: left;">
                  <strong>Facebook Page:</strong> <a href="https://www.facebook.com/profile.php?id=61566885262328" style="color: #001b45; text-decoration: underline;">Follow for more updates</a>
                </p>

                <p style="margin-top: 0; margin-bottom: 25px; font-size: 14px; color: #777; text-align: left;">We will send you further details about the workshop schedule and any necessary preparations closer to the date.</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
                <p style="margin-top: 0; margin-bottom: 0; font-size: 14px; color: #777; text-align: center;">Best regards,</p>
                <p style="margin-top: 5px; margin-bottom: 0; font-size: 14px; color: #777; text-align: center;">TRI (Tech Research and Innovation)</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
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
