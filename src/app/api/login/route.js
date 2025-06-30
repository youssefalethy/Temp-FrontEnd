import { NextResponse } from "next/server";

// login
export async function POST(request) {
    const data = await request.json();
    if (data.email === "seif@gmail.com" && data.password === "123456") {
        return NextResponse.json({ data });
    }
    else {
        return NextResponse.error(" error");
    }
}