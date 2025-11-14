"use client";

import { useQuery } from "@instantdb/react";
import { useParams } from "next/navigation";
import { User, Meme } from "@/types";
import MemeGrid from "@/components/Feed/MemeGrid";
import { formatDate } from "@/lib/utils";

export default function ProfilePage() {
  const params = useParams();
  const userId = params.userId as string;

  const { data, isLoading } = useQuery({
    users: {
      $: {
        where: { id: userId },
      },
    },
    memes: {
      $: {
        where: { creatorId: userId },
        order: { createdAt: "desc" },
      },
    },
  });

  const users = (data?.users || []) as User[];
  const user = users[0];
  const memes = (data?.memes || []) as Meme[];

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-gray-600 dark:text-gray-400">User not found</p>
        </div>
      </div>
    );
  }

  const totalPoints = memes.reduce((sum, meme) => sum + meme.points, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 flex-shrink-0 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.name || user.email}
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Joined {formatDate(user.createdAt)}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">Memes Created</p>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              {memes.length}
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Points</p>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              {totalPoints}
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">Average Points</p>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              {memes.length > 0 ? Math.round(totalPoints / memes.length) : 0}
            </p>
          </div>
        </div>
      </div>

      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Created Memes
      </h2>
      {memes.length === 0 ? (
        <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">
            No memes created yet.
          </p>
        </div>
      ) : (
        <MemeGrid memes={memes} />
      )}
    </div>
  );
}

