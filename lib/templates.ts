import { MemeTemplate } from "@/types";

// Popular crypto and developer meme templates
export const MEME_TEMPLATES: MemeTemplate[] = [
  {
    id: "distracted-boyfriend-crypto",
    imageUrl: "https://i.imgflip.com/1ur9b0.jpg",
    name: "Distracted Boyfriend (Crypto)",
    category: "crypto",
    popularity: 100,
  },
  {
    id: "drake-pointing-code",
    imageUrl: "https://i.imgflip.com/30b1gx.jpg",
    name: "Drake Pointing (Good Code vs Bad Code)",
    category: "developer",
    popularity: 95,
  },
  {
    id: "change-my-mind-dev",
    imageUrl: "https://i.imgflip.com/24y43o.jpg",
    name: "Change My Mind (Developer)",
    category: "developer",
    popularity: 90,
  },
  {
    id: "this-is-fine-crypto",
    imageUrl: "https://i.imgflip.com/26am.jpg",
    name: "This is Fine (Crypto Market)",
    category: "crypto",
    popularity: 85,
  },
  {
    id: "woman-yelling-cat-code",
    imageUrl: "https://i.imgflip.com/345v97.jpg",
    name: "Woman Yelling at Cat (Code Review)",
    category: "developer",
    popularity: 88,
  },
  {
    id: "expanding-brain-dev",
    imageUrl: "https://i.imgflip.com/1jhl5s.jpg",
    name: "Expanding Brain (Developer Progression)",
    category: "developer",
    popularity: 92,
  },
  {
    id: "stonks-crypto",
    imageUrl: "https://i.imgflip.com/2xgf6r.jpg",
    name: "Stonks (Crypto)",
    category: "crypto",
    popularity: 87,
  },
  {
    id: "doge-crypto",
    imageUrl: "https://i.imgflip.com/4t0m5.jpg",
    name: "Doge (Crypto)",
    category: "crypto",
    popularity: 93,
  },
  {
    id: "two-buttons-dev",
    imageUrl: "https://i.imgflip.com/1g8my4.jpg",
    name: "Two Buttons (Developer Dilemma)",
    category: "developer",
    popularity: 80,
  },
  {
    id: "drake-no-yes-dev",
    imageUrl: "https://i.imgflip.com/1bhk.jpg",
    name: "Drake No Yes (Framework Choice)",
    category: "developer",
    popularity: 89,
  },
  {
    id: "waiting-skeleton-crypto",
    imageUrl: "https://i.imgflip.com/2fm6x7.jpg",
    name: "Waiting Skeleton (Crypto)",
    category: "crypto",
    popularity: 75,
  },
  {
    id: "is-this-pigeon-dev",
    imageUrl: "https://i.imgflip.com/1o00in.jpg",
    name: "Is This Pigeon? (Developer)",
    category: "developer",
    popularity: 82,
  },
];

export function getTemplatesByCategory(category?: "crypto" | "developer" | "general"): MemeTemplate[] {
  if (!category) return MEME_TEMPLATES;
  return MEME_TEMPLATES.filter((t) => t.category === category);
}

export function getTemplateById(id: string): MemeTemplate | undefined {
  return MEME_TEMPLATES.find((t) => t.id === id);
}

