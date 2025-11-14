"use client";

import { useState } from "react";
import { MemeTemplate, getTemplatesByCategory } from "@/lib/templates";
import Image from "next/image";

interface MemeTemplateSelectorProps {
  onSelectTemplate: (template: MemeTemplate) => void;
}

export default function MemeTemplateSelector({
  onSelectTemplate,
}: MemeTemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    "crypto" | "developer" | "general" | undefined
  >(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  const templates = getTemplatesByCategory(selectedCategory).filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(undefined)}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            selectedCategory === undefined
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setSelectedCategory("crypto")}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            selectedCategory === "crypto"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          Crypto
        </button>
        <button
          onClick={() => setSelectedCategory("developer")}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            selectedCategory === "developer"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          Developer
        </button>
        <button
          onClick={() => setSelectedCategory("general")}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            selectedCategory === "general"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          General
        </button>
      </div>

      <input
        type="text"
        placeholder="Search templates..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template)}
            className="group relative overflow-hidden rounded-lg border-2 border-gray-200 transition-all hover:border-blue-500 dark:border-gray-700"
          >
            <div className="aspect-square w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img
                src={template.imageUrl}
                alt={template.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-2">
              <p className="text-xs font-medium text-white">{template.name}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

