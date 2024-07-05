import Link from "next/link";

export default function MainHeader() {
  return (
    <header className="flex items-center justify-between h-20 bg-neutral-50 p-5">
      <Link href="/">Home</Link>
      <nav>
        <ul className="flex items-center gap-3">
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/signup">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
