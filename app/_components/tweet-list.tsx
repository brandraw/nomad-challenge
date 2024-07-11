"use client";

import Link from "next/link";
import { initialTweets } from "../page";
import { UserCircleIcon } from "@heroicons/react/16/solid";

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
          className="border rounded-lg shadow-sm p-5 flex flex-col justify-between transition hover:-translate-y-1 hover:shadow-md"
        >
          <span>{a.tweet}</span>
          <div className="flex items-center gap-2 justify-between border-t pt-4 mt-4">
            <div>
              <span className="text-xs text-neutral-400">
                {a.created_at.toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center justify-end gap-2">
              <div className="relative size-6 aspect-square overflow-hidden rounded-full">
                <UserCircleIcon className="size-full text-neutral-400" />
              </div>
              <span className="text-sm text-neutral-400 font-medium">
                {a.user.username}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
