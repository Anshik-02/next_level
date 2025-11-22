import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const url = new URL(req.url);
    const sessionId = url.searchParams.get("sessionId");
    if (!sessionId) return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });

    const body = await req.json();
    const { totalTimePlayer } = body;

    const sessionIdNumber = parseInt(sessionId, 10);
    if (isNaN(sessionIdNumber)) return NextResponse.json({ error: "Invalid sessionId" }, { status: 400 });

    const updatedSession = await db.playerSession.update({
      where: { id: sessionIdNumber },
      data: { totalTimePlayer },
    });

    return NextResponse.json(updatedSession, { status: 200 });
  } catch (error) {
    console.error("Error updating player time:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
