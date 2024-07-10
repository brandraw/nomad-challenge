import { NextRequest } from "next/server";
import { getSession } from "./lib/session";

const publicRoutes = new Set([
  "/",
  "/login",
  "/create-account",
  "/kakao/start",
  "/kakao/complete",
]);

export async function middleware(req: NextRequest) {
  const session = await getSession();
  const isPublic = publicRoutes.has(req.nextUrl.pathname);
  const isLoggedIn = Boolean(session.id);

  if (!isLoggedIn) {
    if (!isPublic) {
      return Response.redirect(new URL("/", req.url));
    }
  }
  if (isLoggedIn) {
    if (isPublic) {
      return Response.redirect(new URL("/profile", req.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
