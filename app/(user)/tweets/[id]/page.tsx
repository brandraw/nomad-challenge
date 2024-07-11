import { db } from "@/lib/db";
import { formatDate } from "@/lib/util";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { notFound } from "next/navigation";

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    select: {
      tweet: true,
      created_at: true,
      user: {
        select: {
          username: true,
          bio: true,
        },
      },
    },
  });

  return tweet;
}

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const tweet = await getTweet(id);
  if (!tweet) {
    return notFound();
  }

  return (
    <div className="p-2">
      <div className="border rounded-lg p-5 flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b pb-4">
          <div className="relative size-10 aspect-square overflow-hidden rounded-full">
            <UserCircleIcon className="size-full" />
          </div>
          <span className="font-semibold">{tweet.user.username}</span>
        </div>

        <div className="border-b pb-4">
          <span className="text-xs text-neutral-400">
            {formatDate(tweet.created_at)}
          </span>
        </div>

        <span>{tweet.tweet}</span>
      </div>
    </div>
  );
}
