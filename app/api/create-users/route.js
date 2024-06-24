import { db, sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
    // const name = searchParams.get("name");
    // const email = searchParams.get("email");
    // const token = searchParams.get("token");
    // const client = await db.connect();
    console.log(request);

    // const result =
    //   await client.sql`INSERT INTO users (id, name, email, token) VALUES (${crypto.randomUUID()}, ${name}, ${email}, ${token})`;

    return NextResponse.json({ request }, { status: 200 });
  } catch (error) {
    console.error("error occur", error);
  }
}
