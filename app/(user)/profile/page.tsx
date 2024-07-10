import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { notFound } from "next/navigation";

async function getUserProfile(id: number) {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    select: {
      username: true,
      email: true,
      bio: true,
    },
  });

  return user;
}

export default async function Profile() {
  const session = await getSession();
  const user = await getUserProfile(session.id!);
  if (!user) {
    return notFound();
  }

  return (
    <div className="p-5 space-y-4">
      <h1 className="text-2xl font-semibold">Hello!</h1>
      <div className="flex items-center gap-3 bg-blue-50 p-3 border rounded-lg">
        <div className="relative aspect-square size-10 rounded-full overflow-hidden">
          <UserCircleIcon className="size-full text-neutral-400" />
        </div>
        <span className="text-lg font-semibold">{user.username}</span>
      </div>
    </div>
  );
}
