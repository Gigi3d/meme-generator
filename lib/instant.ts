import { init } from "@instantdb/react";

const APP_ID = process.env.NEXT_PUBLIC_INSTANT_APP_ID || "";

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

