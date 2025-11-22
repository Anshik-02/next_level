  import { db } from "@/lib/db";
  import { NextResponse } from "next/server";

  export async function GET() {
    try {
   const allPlayers = await db.playerSession.findMany({
  where: {
    endSession: false,
  },
  include: {
    snacks: {
      include: {
        snackItem: true, 
      },
    },
  },
});

      return NextResponse.json(allPlayers, { status: 200 });
    } catch (error) {
      console.error("Error in fetching users", error);
      return NextResponse.json({ success: false }, { status: 500 });
    }
  }
