  import { db } from "@/lib/db";
  import { NextResponse } from "next/server";

  export async function GET() {
    try {
   const device = await db.device.findMany({
  include: {
    pricing: {
      include: {
        device: true,
      },
    },
  },
});

      return NextResponse.json(device, { status: 200 });
    } catch (error) {
      console.error("Error in fetching users", error);
      return NextResponse.json({ success: false }, { status: 500 });
    }
  }
