"use client";

import { useQuery } from "@/lib/instant";
import { Meme, User } from "@/types";
import { formatDate } from "@/lib/utils";
import VoteButtons from "@/components/Voting/VoteButtons";
import CommentSection from "@/components/Comments/CommentSection";
import Link from "next/link";
import { useState } from "react";

interface MemeCardProps {
  meme: Meme;
}

export default function MemeCard({ meme }: MemeCardProps) {
  const [showComments, setShowComments] = useState(false);

  const { data } = useQuery({
    users: {
      $: {
        where: { id: meme.creatorId },
      },
    },
  });

  const users = (data?.users || []) as User[];
  const creator = users[0];
  const commentCount = 0; // Will be calculated from comments query

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="relative w-full">
        <img
          src={meme.imageUrl}
          alt={meme.topText || "Meme"}
          className="h-auto w-full object-contain"
        />
        {meme.topText && (
          <div className="absolute top-4 left-0 right-0 text-center">
            <p className="text-2xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {meme.topText}
            </p>
          </div>
        )}
        {meme.bottomText && (
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <p className="text-2xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {meme.bottomText}
            </p>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <VoteButtons meme={meme} />
        </div>

        <div className="mb-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Link
            href={`/profile/${meme.creatorId}`}
            className="font-medium hover:underline"
          >
            {creator?.name || creator?.email || "Anonymous"}
          </Link>
          <span>•</span>
          <span>{formatDate(meme.createdAt)}</span>
        </div>

        <button
          onClick={() => setShowComments(!showComments)}
          className="text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          {showComments ? "Hide" : "Show"} Comments
        </button>

        {showComments && <CommentSection meme={meme} />}
      </div>
    </div>
  );
}

