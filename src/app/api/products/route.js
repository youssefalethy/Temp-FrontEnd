import { products } from "@/helpers/helpers";
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(products);
}
