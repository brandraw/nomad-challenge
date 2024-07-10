import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface session {
  id?: number;
}

export function getSession() {
  return getIronSession<session>(cookies(), {
    cookieName: "Nice Cookie",
    password: process.env.COOKIE_PASSWORD!,
  });
}
