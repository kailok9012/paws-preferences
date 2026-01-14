"use client";

import { useState, useRef } from "react";
import { cats, Cat } from "@/data/cats";

export default function Home() {
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState<Cat[]>([]);
  const [translate, setTranslate] = useState(0);
  const [swipeEmoji, setSwipeEmoji] = useState("");
  const startX = useRef(0);

  const restartGame = () => {
    setIndex(0);
    setLiked([]);
    setTranslate(0);
    setSwipeEmoji("");
  };

  if (index >= cats.length) {
    return (
      <main className="min-h-screen p-4 flex flex-col items-center justify-center gap-6">
        <h2 className="text-2xl font-bold mb-6">
          You liked {liked.length} cats 🐱
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-5xl">
          {liked.map((cat) => (
            <div
              key={cat.id}
              className="w-full aspect-square rounded-xl overflow-hidden"
            >
              <img
                src={cat.url}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <button
          onClick={restartGame}
          className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition"
        >
          Replay
        </button>
      </main>
    );
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX.current;
    setTranslate(diff);

    if (diff > 50) setSwipeEmoji("❤️");
    else if (diff < -50) setSwipeEmoji("❌");
    else setSwipeEmoji("");
  };

  const handleTouchEnd = () => {
    if (translate > 100) {
      setLiked([...liked, cats[index]]);
      setIndex(index + 1);
    } else if (translate < -100) {
      setIndex(index + 1);
    }
    setTranslate(0);
    setSwipeEmoji("");
  };

  return (
    <main className="h-screen flex flex-col items-center justify-center gap-6 px-4 sm:px-6">
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl aspect-[4/5] relative rounded-2xl shadow-lg overflow-hidden bg-gray-100 flex items-center justify-center transition-transform duration-200 ease-out"
        style={{
          transform: `translateX(${translate}px) rotate(${translate / 15}deg)`,
          opacity: 1 - Math.abs(translate) / 500,
        }}
      >
        <img
          src={cats[index].url}
          alt={cats[index].name}
          className="w-full h-full object-cover rounded-2xl"
        />

        {swipeEmoji && (
          <div
            className={`absolute text-6xl font-bold ${
              swipeEmoji === "❤️"
                ? "text-red-500 right-4"
                : "text-gray-700 left-4"
            } top-4 animate-bounce`}
          >
            {swipeEmoji}
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500"> Swipe left ❌ | Swipe right ❤️</p>
    </main>
  );
}
