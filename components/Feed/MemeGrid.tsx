"use client";

import Masonry from "react-masonry-css";
import { Meme } from "@/types";
import MemeCard from "./MemeCard";

interface MemeGridProps {
  memes: Meme[];
}

export default function MemeGrid({ memes }: MemeGridProps) {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="masonry-grid"
      columnClassName="masonry-grid_column"
    >
      {memes.map((meme) => (
        <div key={meme.id} className="mb-4">
          <MemeCard meme={meme} />
        </div>
      ))}
    </Masonry>
  );
}

