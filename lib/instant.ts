import { init } from "@instantdb/react";

const APP_ID = process.env.NEXT_PUBLIC_INSTANT_APP_ID || "859879cc-787b-49d4-9d1a-ae06b33c2edd";

export type Schema = {
  users: {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
    createdAt: number;
  };
  memes: {
    id: string;
    imageUrl: string;
    topText?: string;
    bottomText?: string;
    creatorId: string;
    points: number;
    createdAt: number;
    templateId?: string;
  };
  votes: {
    id: string;
    memeId: string;
    userId: string;
    type: "upvote" | "downvote";
    createdAt: number;
  };
  comments: {
    id: string;
    memeId: string;
    userId: string;
    text: string;
    createdAt: number;
  };
  meme_templates: {
    id: string;
    imageUrl: string;
    name: string;
    category: "crypto" | "developer" | "general";
    popularity: number;
  };
};

export const db = init<Schema>({ appId: APP_ID });

// Export hooks for convenience
export const { useAuth, useQuery, useUser, useConnectionStatus } = db;

