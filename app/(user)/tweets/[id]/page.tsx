import { db } from "@/lib/db";
import { formatDate } from "@/lib/util";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { ArrowLeftIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
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

async function getPrevTweet(id: number) {
  const tweet = await db.tweet.findFirst({
    where: {
      id: {
        lt: id,
      },
    },
    orderBy: {
      id: "desc",
    },
    select: {
      id: true,
    },
  });

  return tweet;
}
async function getNextTweet(id: number) {
  const tweet = await db.tweet.findFirst({
    where: {
      id: {
        gt: id,
      },
    },
    orderBy: {
      id: "asc",
    },
    select: {
      id: true,
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

  const prevTweet = await getPrevTweet(id);
  const nextTweet = await getNextTweet(id);

  return (
    <div className="p-2 space-y-2">
      <div className="border rounded-lg p-5 flex items-center">
        <Link
          href={`/`}
          className="flex items-center gap-2 text-sm text-neutral-400"
        >
          <ArrowLeftIcon className="size-5" />
          Back to Tweets
        </Link>
      </div>
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
      <div className="rounded-lg border p-5 flex items-center justify-between *:text-blue-500 *:font-semibold *:text-sm *:flex *:items-center *:gap-2 *:transition">
        {prevTweet && (
          <Link
            href={`/tweets/${prevTweet.id}`}
            className="mr-auto hover:text-blue-800"
          >
            <ArrowLeftIcon className="size-4" />
            Prev Tweet
          </Link>
        )}
        {nextTweet && (
          <Link
            href={`/tweets/${nextTweet.id}`}
            className="ml-auto hover:text-blue-800"
          >
            Next Tweet
            <ArrowRightIcon className="size-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
