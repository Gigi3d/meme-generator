"use client";

import { useQuery } from "@instantdb/react";
import { Meme } from "@/types";
import MemeGrid from "@/components/Feed/MemeGrid";

export default function FeedPage() {
  const { data, isLoading } = useQuery({
    memes: {
      $: {
        order: { createdAt: "desc" },
      },
    },
  });

  const memes = (data?.memes || []) as Meme[];

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-gray-600 dark:text-gray-400">Loading memes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
        Meme Feed
      </h1>
      {memes.length === 0 ? (
        <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
          <div className="text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No memes yet!
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
              Be the first to create a meme.
            </p>
          </div>
        </div>
      ) : (
        <MemeGrid memes={memes} />
      )}
    </div>
  );
}

