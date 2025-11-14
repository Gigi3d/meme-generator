"use client";

import { useState } from "react";
import { useAuth, useQuery } from "@/lib/instant";
import { db } from "@/lib/instant";
import MemeEditor from "@/components/Meme/MemeEditor";
import MemeTemplateSelector from "@/components/Meme/MemeTemplateSelector";
import { MemeTemplate } from "@/types";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const { auth, user } = useAuth();
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<MemeTemplate | undefined>();
  const [showTemplates, setShowTemplates] = useState(false);

  const handleSave = async (imageData: string, topText: string, bottomText: string) => {
    if (!user) {
      alert("Please sign in to create memes");
      return;
    }

    try {
      // For now, we'll use the data URL directly
      // In production, you'd upload to InstantDB storage bucket
      const memeId = db.id();
      await db.transact(
        db.tx.memes[memeId].update({
          id: memeId,
          imageUrl: imageData,
          topText: topText || undefined,
          bottomText: bottomText || undefined,
          creatorId: user.id,
          points: 0,
          createdAt: Date.now(),
          templateId: selectedTemplate?.id,
        })
      );

      router.push("/feed");
    } catch (error) {
      console.error("Error saving meme:", error);
      alert("Failed to save meme. Please try again.");
    }
  };

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">
          <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Sign In Required
          </h1>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            You need to sign in to create memes.
          </p>
          <button
            onClick={() => auth.signIn()}
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Create Meme
        </h1>
        <button
          onClick={() => setShowTemplates(!showTemplates)}
          className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          {showTemplates ? "Hide Templates" : "Show Templates"}
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MemeEditor
            template={selectedTemplate}
            onSave={handleSave}
          />
        </div>

        {showTemplates && (
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                Meme Templates
              </h2>
              <MemeTemplateSelector
                onSelectTemplate={(template) => {
                  setSelectedTemplate(template);
                  setShowTemplates(false);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

