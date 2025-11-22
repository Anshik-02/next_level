import { NextResponse } from "next/server";

export async function POST(req:Request){
const {email,password}=await req.json();
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("adminAuth", "true", { httpOnly: true });
    return response;
  }
return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
}