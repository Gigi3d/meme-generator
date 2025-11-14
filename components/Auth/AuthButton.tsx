"use client";

import { useAuth } from "@/lib/instant";
import { useState } from "react";
import AuthModal from "./AuthModal";

export default function AuthButton() {
  const { auth, user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {user.name || user.email}
        </span>
        <button
          onClick={() => auth.signOut()}
          className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Sign In
      </button>
      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </>
  );
}

