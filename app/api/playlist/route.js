import { db, sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const client = await db.connect();

    const result = await client.sql`SELECT * FROM likeSongs`;

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error("error occur", error);
    throw error;
  }
}
