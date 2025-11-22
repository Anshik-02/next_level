import { db } from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma/client";
import { NextResponse } from "next/server";
import { parse } from "path";

export async function POST(req: Request) {
  try {
    const value = await req.json();

    const snack = await db.snackItem.create({
      data: {
        name: value.snackName,
        price: Number(value.price),
        image: value.imageUrl,
        quantity: Number(value.quantity),
      },
    });

    return NextResponse.json({ success: true, snack }, { status: 200 });
  } catch (error: any) {
    console.error("Error creating player:", error);

    return NextResponse.json(
      { success: false, message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
