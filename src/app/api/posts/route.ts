import { createConnection } from "@/app/lib/db";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

async function sendConfirmationEmail(email: string, firstName: string) {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // or use another email service
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  transporter.verify((error, success) => {
    if (error) {
      console.error("Transporter Error:", error);
    } else {
      console.log("Server is ready to send emails:", success);
    }
  });

  await transporter.sendMail({
    from: '"TRI Workshop Team" <kcsamm6@gmail.com>', //your-email@example.com
    to: email,
    subject: "Workshop Registration Confirmation",
    text: `Hi ${firstName},\n\nThank you for registering for the workshop! We look forward to seeing you there.\n\nBest regards,\nTRI Workshop Team`,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      institution,
      major,
      yearOfStudy,
      dataConsent,
    } = body;

    // Validate input
    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = await createConnection();
    const [result] = await db.execute(
      "INSERT INTO test_workshop (First_Name, Last_Name, Email, Phone_No, College_Institution, Subject_Field, Year_Sem, Submit, status, registrationDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())",
      [firstName, lastName, email, phone, institution, major, yearOfStudy, dataConsent]
    );

    await sendConfirmationEmail(email, firstName);

    return NextResponse.json({
      success: true,
      message: "Workshop registration created successfully",
      uid: (result as { insertId: number }).insertId,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}