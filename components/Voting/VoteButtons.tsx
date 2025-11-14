"use client";

import { useAuth, useQuery } from "@/lib/instant";
import { db } from "@/lib/instant";
import { useState, useEffect } from "react";
import { Meme } from "@/types";

interface VoteButtonsProps {
  meme: Meme;
}

export default function VoteButtons({ meme }: VoteButtonsProps) {
  const { auth, user } = useAuth();
  const [userVote, setUserVote] = useState<"upvote" | "downvote" | null>(null);

  const { data } = useQuery(
    {
      votes: {
        $: {
          where: {
            memeId: meme.id,
            ...(user?.id && { userId: user.id }),
          },
        },
      },
    },
    { enabled: !!user }
  );

  const votes = data?.votes || [];

  useEffect(() => {
    if (votes?.[0]) {
      setUserVote(votes[0].type);
    } else {
      setUserVote(null);
    }
  }, [votes]);

  const handleVote = async (type: "upvote" | "downvote") => {
    if (!user) {
      alert("Please sign in to vote");
      return;
    }

    const existingVote = votes?.[0];
    const newType = userVote === type ? null : type;

    if (existingVote) {
      if (newType === null) {
        // Remove vote
        const pointChange = existingVote.type === "upvote" ? -10 : 10;
        await db.transact(
          db.tx.votes[existingVote.id].delete(),
          db.tx.memes[meme.id].update({ points: meme.points + pointChange })
        );
        setUserVote(null);
      } else if (existingVote.type !== newType) {
        // Change vote
        const pointChange = newType === "upvote" ? 20 : -20;
        await db.transact(
          db.tx.votes[existingVote.id].update({ type: newType }),
          db.tx.memes[meme.id].update({ points: meme.points + pointChange })
        );
        setUserVote(newType);
      }
    } else {
      // Create new vote
      const pointChange = type === "upvote" ? 10 : -10;
      const voteId = db.id();
      await db.transact(
        db.tx.votes[voteId].update({
          id: voteId,
          memeId: meme.id,
          userId: user.id,
          type: type,
          createdAt: Date.now(),
        }),
        db.tx.memes[meme.id].update({ points: meme.points + pointChange })
      );
      setUserVote(type);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleVote("upvote")}
        disabled={!user}
        className={`flex items-center gap-1 rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
          userVote === "upvote"
            ? "bg-green-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        } disabled:opacity-50`}
      >
        <span>▲</span>
        <span>Upvote</span>
      </button>
      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        {meme.points} pts
      </span>
      <button
        onClick={() => handleVote("downvote")}
        disabled={!user}
        className={`flex items-center gap-1 rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
          userVote === "downvote"
            ? "bg-red-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        } disabled:opacity-50`}
      >
        <span>▼</span>
        <span>Downvote</span>
      </button>
    </div>
  );
}

