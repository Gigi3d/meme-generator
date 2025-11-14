"use client";

import Link from "next/link";
import { useAuth } from "@instantdb/react";
import AuthButton from "./Auth/AuthButton";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/feed" className="text-2xl font-bold text-gray-900 dark:text-white">
          Meme Generator
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/feed"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Feed
          </Link>
          <Link
            href="/create"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Create
          </Link>
          {user && (
            <Link
              href={`/profile/${user.id}`}
              className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Profile
            </Link>
          )}
          <AuthButton />
        </nav>
      </div>
    </header>
  );
}

