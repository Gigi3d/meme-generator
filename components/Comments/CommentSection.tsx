"use client";

import { useAuth, useQuery } from "@instantdb/react";
import { db } from "@/lib/instant";
import { useState } from "react";
import { Meme, Comment, User } from "@/types";
import CommentItem from "./CommentItem";

interface CommentSectionProps {
  meme: Meme;
}

export default function CommentSection({ meme }: CommentSectionProps) {
  const { auth, user } = useAuth();
  const [commentText, setCommentText] = useState("");

  const { data } = useQuery({
    comments: {
      $: {
        where: { memeId: meme.id },
        order: { createdAt: "desc" },
      },
    },
    users: {},
  });

  const comments = (data?.comments || []) as Comment[];
  const users = (data?.users || []) as User[];
  const userMap = new Map(users.map((u) => [u.id, u]));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !commentText.trim()) return;

    const commentId = db.id();
    await db.transact(
      db.tx.comments[commentId].update({
        id: commentId,
        memeId: meme.id,
        userId: user.id,
        text: commentText.trim(),
        createdAt: Date.now(),
      })
    );
    setCommentText("");
  };

  return (
    <div className="mt-4">
      <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
        Comments ({comments.length})
      </h3>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            disabled={!commentText.trim()}
            className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Post Comment
          </button>
        </form>
      ) : (
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Please{" "}
          <button
            onClick={() => {
              // Trigger auth modal - parent should handle this
              window.location.href = "/feed";
            }}
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            sign in
          </button>{" "}
          to comment
        </p>
      )}

      <div className="space-y-2">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              author={userMap.get(comment.userId)}
            />
          ))
        )}
      </div>
    </div>
  );
}

