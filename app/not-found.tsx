import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl font-semibold">No Data !!</h1>
        <Link
          href={`/home`}
          className="bg-orange-400 text-white border rounded-lg py-2 px-4 flex items-center justify-center shadow-sm text-sm self-center"
        >
          Go To Home
        </Link>
      </div>
    </div>
  );
}
