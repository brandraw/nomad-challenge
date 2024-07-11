import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

const publicRoutes = new Set([
  "/home",
  "/login",
  "/create-account",
  "/kakao/start",
  "/kakao/complete",
]);

export async function middleware(req: NextRequest) {
  const session = await getSession();
  const isPublic = publicRoutes.has(req.nextUrl.pathname);
  const isLoggedIn = Boolean(session.id);

  if (!isLoggedIn && !isPublic) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  if (isLoggedIn) {
    if (isPublic) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
