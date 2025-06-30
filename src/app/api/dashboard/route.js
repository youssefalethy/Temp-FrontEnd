import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ data: [65, 59, 80, 81, 56] });
}