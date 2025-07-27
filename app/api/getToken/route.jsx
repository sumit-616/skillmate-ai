import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

const assemblyAi = new AssemblyAI({ apiKey: process.env.ASSEMBLY_API_KEY });

export async function GET(req) {
  const token = await assemblyAi.streaming.createTemporaryToken({
    expires_in_seconds: 600,
  });
  return NextResponse.json(token);
}
