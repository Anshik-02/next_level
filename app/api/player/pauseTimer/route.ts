import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("sessionId"));

  if (!id) return NextResponse.json({ error: "Invalid sessionId" }, { status: 400 });

  const { isPaused } = await req.json();

  const session = await db.playerSession.findUnique({ where: { id } });
  if (!session) return NextResponse.json({ error: "Session not found" }, { status: 404 });

  let updatedSession;

  if (isPaused) {
    updatedSession = await db.playerSession.update({
      where: { id },
      data: { isPaused: true, pausedAt: new Date(), isActive: false },
    });
  } else if (session.pausedAt) {
    const pausedDuration = Date.now() - new Date(session.pausedAt).getTime();

    updatedSession = await db.playerSession.update({
      where: { id },
      data: {
        isPaused: false,
        isActive: true,
        pausedAt: null,
        totalPausedDuration: { increment: pausedDuration },
      },
    });
  }

  return NextResponse.json({ success: true, updatedSession });
}
