export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: number;
}

export interface Meme {
  id: string;
  imageUrl: string;
  topText?: string;
  bottomText?: string;
  creatorId: string;
  points: number;
  createdAt: number;
  templateId?: string;
}

export interface Vote {
  id: string;
  memeId: string;
  userId: string;
  type: "upvote" | "downvote";
  createdAt: number;
}

export interface Comment {
  id: string;
  memeId: string;
  userId: string;
  text: string;
  createdAt: number;
}

export interface MemeTemplate {
  id: string;
  imageUrl: string;
  name: string;
  category: "crypto" | "developer" | "general";
  popularity: number;
}

