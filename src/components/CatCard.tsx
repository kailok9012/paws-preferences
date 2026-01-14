"use client";

import { useRef } from "react";
import { Cat } from "@/data/cats";

type Props = {
  cat: Cat;
  onLike: () => void;
  onDislike: () => void;
};

export default function CatCard({ cat, onLike, onDislike }: Props) {
  const startX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX.current;

    if (diff > 100) onLike();
    if (diff < -100) onDislike();
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="w-[90vw] h-[70vh] bg-white rounded-2xl shadow-lg flex items-center justify-center"
    >
      <img
        src={cat.url}
        alt="cat"
        className="w-full h-full object-cover rounded-2xl"
      />
    </div>
  );
}
