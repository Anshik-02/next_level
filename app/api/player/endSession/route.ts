import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = Number(searchParams.get("sessionId"));

    if (!sessionId) {
      return NextResponse.json({ error: "Invalid sessionId" }, { status: 400 });
    }

    const session = await db.playerSession.findUnique({
      where: { id: sessionId },
      include: {
        deviceRelation: true,
        snacks: { include: { snackItem: true } },
      },
    });
    await db.device.update({
      where: { deviceName: session?.deviceRelation.deviceName },
      data: { isAvailable: true },
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const endTime = new Date();
    const totalPlayedMs =
      endTime.getTime() -
      session.startTime.getTime() -
      session.totalPausedDuration;
    const totalPlayedSeconds = Math.floor(totalPlayedMs / 1000);

    const pricing = await db.devicePricing.findFirst({
      where: { deviceId: session.deviceId, players: session.players },
    });

    const timeBill = pricing
      ? Math.ceil(totalPlayedSeconds / 1800) * pricing.pricePer30
      : 0;

    const snackBill = session.snacks.reduce((sum, s) => sum + s.totalPrice, 0);

    const totalBill = timeBill + snackBill;
    const updatedSession = await db.playerSession.update({
      where: { id: sessionId },
      data: {
        endTime,
        endSession: true,
        isPaused: true,
        isActive: false,
        totalTimePlayer: totalPlayedSeconds,
        totalBill,
      },
    });

    return NextResponse.json({ success: true, updatedSession });
  } catch (err) {
    console.error("Error ending session:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
