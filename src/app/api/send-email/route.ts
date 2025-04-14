import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { email, firstName, lastName } = await request.json();
    
    if (!email || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false // Helps avoid TLS issues in some environments
      }
    });
    
    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Workshop Registration Confirmation",
      text: `Hello ${firstName} ${lastName},\n\nThank you for registering for our workshop! We have received your registration and we're excited to have you join us.\n\nBest regards,\nThe Workshop Team`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <h2 style="color: #333; text-align: center;">Workshop Registration Confirmation</h2>
          <p>Hello <strong>${firstName} ${lastName}</strong>,</p>
          <p>Thank you for registering for our workshop! We have received your registration and we're excited to have you join us.</p>
          <p>Best regards,<br>The Workshop Team</p>
        </div>
      `,
    };
    
    // Log attempt for debugging
    console.log('Attempting to send email to:', email);
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully'
    });
    
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send email',
        error: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}