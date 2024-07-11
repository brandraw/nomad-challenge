import Link from "next/link";

export default function Home() {
  return (
    <main className="p-5 min-h-screen flex flex-col justify-center gap-5">
      <div className="h-16"></div>
      <h1 className="text-3xl font-bold">Welcome To Nomad Challenge!</h1>
      <Link
        href="/login"
        className="w-full bg-orange-400 text-white font-semibold flex items-center justify-center rounded-lg border min-h-10 p-3 shadow-sm"
      >
        Let's go to work!
      </Link>
    </main>
  );
}
