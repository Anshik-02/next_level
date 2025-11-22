// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // 1️⃣ Allow public routes and API routes
  if (!path.startsWith("/admin")) {
    return NextResponse.next();
  }

  // 2️⃣ Allow the login page itself to load
  if (path === "/admin/login") {
    return NextResponse.next();
  }

  // 3️⃣ Check if adminAuth cookie exists and is true
  const isAdminLoggedIn = req.cookies.get("adminAuth")?.value === "true";

  // 4️⃣ If not logged in and trying to access admin route
  if (!isAdminLoggedIn) {
    const loginUrl = new URL("/admin/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // 5️⃣ Otherwise, allow access
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // applies only to /admin routes
};
