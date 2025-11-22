import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
      const url = new URL(req.url);
    const playerIdNum = Number(url.searchParams.get("playerId"));

    if (!playerIdNum) {
      return NextResponse.json({ success: false, message: "Invalid playerId" }, { status: 400 });
    }

    const player = await db.playerSession.findUnique({
      where: { id: playerIdNum },
      include: {
        snacks: {
          include: {
            snackItem: true,
          },
        },
      },
    });

    if (!player) {
      return NextResponse.json(
        { success: false, message: "Player not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, player }, { status: 200 });
  } catch (error) {
    console.error("Error fetching player:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}