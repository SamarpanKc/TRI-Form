import { createConnection } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const connection = await createConnection();
    const [rows] = await connection.query("SELECT * FROM test_workshop");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 });
  }
}