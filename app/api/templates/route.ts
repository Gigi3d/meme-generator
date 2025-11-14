import { NextResponse } from "next/server";
import { MEME_TEMPLATES } from "@/lib/templates";

export async function GET() {
  return NextResponse.json(MEME_TEMPLATES);
}

