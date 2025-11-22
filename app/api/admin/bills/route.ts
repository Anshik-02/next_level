
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await db.playerSession.findMany({
      where: { endSession: true },
      include: {
        deviceRelation: true,
        snacks: {
          include: { snackItem: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Failed to fetch bills:", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch bills" },
      { status: 500 }
    );
  }
}
