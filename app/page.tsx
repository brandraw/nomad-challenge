import { db } from "@/lib/db";
import Link from "next/link";
import { TweetList } from "./_components/tweet-list";
import { Prisma } from "@prisma/client";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

async function getTweets() {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
      user: {
        select: {
          username: true,
          bio: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return tweets;
}

export type initialTweets = Prisma.PromiseReturnType<typeof getTweets>;

export default async function Home() {
  const initialTweets = await getTweets();

  return (
    <main className="p-2 min-h-screen flex flex-col gap-5">
      <div className="h-14" />
      <TweetList initialTweets={initialTweets} />
      <Link href={`/tweets/add`} className="fixed right-5 bottom-10 z-10">
        <PlusCircleIcon className="size-12 text-blue-500 transition hover:text-blue-600 " />
      </Link>
    </main>
  );
}
