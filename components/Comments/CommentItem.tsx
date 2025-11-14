"use client";

import { Comment, User } from "@/types";
import { formatDate } from "@/lib/utils";

interface CommentItemProps {
  comment: Comment;
  author?: User;
}

export default function CommentItem({ comment, author }: CommentItemProps) {
  return (
    <div className="border-b border-gray-200 py-3 last:border-b-0 dark:border-gray-700">
      <div className="flex items-start gap-3">
        <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {author?.name || author?.email || "Anonymous"}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(comment.createdAt)}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
            {comment.text}
          </p>
        </div>
      </div>
    </div>
  );
}

