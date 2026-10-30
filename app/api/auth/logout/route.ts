import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const base = req.nextUrl.clone();
  base.pathname = "/login";
  base.search = "";
  const res = NextResponse.redirect(base);
  res.cookies.set(SESSION_COOKIE, "", { maxAge: 0, path: "/" });
  return res;
}
