"use client";

import Link from "next/link";
import { initialTweets } from "../page";

interface tweetProps {
  initialTweets: initialTweets;
}

export function TweetList({ initialTweets }: tweetProps) {
  return (
    <div className="flex flex-col gap-3">
      {initialTweets.map((a) => (
        <Link
          href={`/tweets/${a.id}`}
          key={a.id}
          className="border rounded-lg shadow-sm p-5 flex justify-between transition hover:-translate-y-1 hover:shadow-md"
        >
          <span>{a.tweet}</span>
        </Link>
      ))}
    </div>
  );
}
