import { db } from "@/lib/db";

import { NextResponse } from "next/server";


export async function GET(req: Request) {
    try {
    const snack = await db.snackItem.findMany({
    where:{isDeleted:false}    
    });
    return NextResponse.json(snack, { status: 200 });
  } catch (error: any) {
    console.error("Error fecthing data:", error);

    return NextResponse.json(
      { success: false, message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
