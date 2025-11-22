import { db } from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma/client";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const values = await req.json();

    const deviceRecord = await db.device.findUnique({
      where: { deviceName: values.device },
    });

    if (!deviceRecord) {
      return NextResponse.json(
        { success: false, message: "Device not found" },
        { status: 404 }
      );
    }

    const player = await db.playerSession.create({
      data: {
        playerName: values.username,
        players: parseInt(values.players),
        device: values.device,
        deviceId: deviceRecord.id,
        startTime: new Date(),       
        totalPausedDuration: 0,     
        isActive: true,               
        endTime: null,             
        endSession: false,
        totalTimePlayer: 0,
        isPaused: false,
      },
    });


    await db.device.update({
      where: { deviceName: values.device },
      data: { isAvailable: false },
    });

    return NextResponse.json({ success: true, player }, { status: 200 });
  } catch (error: any) {
    console.error("Error creating player:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { success: false, message: "Player name already exists!" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { success: false, message: "Something went wrong!" },
      { status: 500 }
    );
  }
}


export async function PATCH(req: Request) {
  try {
    const value = await req.json();
    const { playerId, snacks, quantity } = value;

    const playerIdNum = Number(playerId);
    const qty = Number(quantity) || 1;

    if (!playerIdNum || !snacks?.length) {
      return NextResponse.json(
        { success: false, message: "Invalid player or snack data!" },
        { status: 400 }
      );
    }


    const selectedSnacks = await db.snackItem.findMany({
      where: { id: { in: snacks } },
    });

    if (!selectedSnacks.length) {
      return NextResponse.json(
        { success: false, message: "No snacks found!" },
        { status: 404 }
      );
    }


    for (const snack of selectedSnacks) {
      if (snack.quantity < qty) {
        return NextResponse.json(
          { success: false, message: `${snack.name} is out of stock!` },
          { status: 400 }
        );
      }
    }

    const snackOrders = selectedSnacks.map((snack) => ({
      snackItemId: snack.id,
      playerSessionId: playerIdNum,
      quantity: qty,
      totalPrice: snack.price * qty,
    }));

    await db.snackOrder.createMany({
      data: snackOrders,
    });


    for (const snack of selectedSnacks) {
      await db.snackItem.update({
        where: { id: snack.id },
        data: {
          quantity: { decrement: qty },
        },
      });
    }

    const totalAdded = selectedSnacks.reduce(
      (sum, snack) => sum + snack.price * qty,
      0
    );


    const session = await db.playerSession.findUnique({
      where: { id: playerIdNum },
      select: { snackBill: true, timeBill: true },
    });

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Session not found!" },
        { status: 404 }
      );
    }

    const updatedSession = await db.playerSession.update({
      where: { id: playerIdNum },
      data: {
        snackBill: session.snackBill + totalAdded,
        totalBill: session.timeBill + session.snackBill + totalAdded,
      },
      select: {
        snackBill: true,
        totalBill: true,
      },
    });

    return NextResponse.json({ success: true, updatedSession });

  } catch (error) {
    console.error("Error adding snacks:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
