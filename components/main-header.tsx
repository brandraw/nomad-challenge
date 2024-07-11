import { getSession } from "@/lib/session";
import { UserLogout } from "@/lib/user-logout";
import Link from "next/link";

export default async function MainHeader() {
  const session = await getSession();
  const isLoggedIn = Boolean(session.id);

  return (
    <div className="fixed w-full top-0 left-0">
      <div className="max-w-screen-sm mx-auto w-full">
        <header className="flex items-center justify-between h-14 bg-yellow-50 p-5 rounded-lg mx-2 mt-2 shadow-sm border">
          {isLoggedIn ? (
            <Link href="/" className="font-semibold text-sm">
              SWEETER
            </Link>
          ) : (
            <Link href="/home" className="font-semibold text-sm">
              HOME
            </Link>
          )}
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
      </div>
    </div>
  );
}
