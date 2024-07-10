import { getSession } from "@/lib/session";
import { UserLogout } from "@/lib/user-logout";
import Link from "next/link";

export default async function MainHeader() {
  const session = await getSession();
  const isLoggedIn = Boolean(session.id);

  return (
    <header className="flex items-center justify-between h-20 bg-neutral-100 p-5">
      <Link href="/" className="font-semibold">
        Go Home
      </Link>
      <nav>
        <ul className="flex items-center gap-3 *:text-sm *:text-neutral-500">
          {!isLoggedIn && (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/create-account">Sign Up</Link>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <form action={UserLogout}>
                  <button>Log Out</button>
                </form>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
