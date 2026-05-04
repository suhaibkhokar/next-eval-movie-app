"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function FavoritesPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(data);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-8 py-6 sm:py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-4 sm:mb-6 flex items-center gap-1.5 sm:gap-2 rounded-full bg-gradient-to-r from-slate-800/80 to-slate-700/80 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:from-cyan-600 hover:to-purple-600 hover:shadow-cyan-500/50"
      >
        <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
        <span>Back</span>
      </button>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
        ❤️ My Favorites
      </h1>

      {favorites.length === 0 ? (
        <p className="text-sm sm:text-base text-gray-400">No favorite movies yet</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">

          {favorites.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform"
            >

              {/* IMAGE */}
              <div className="relative w-full h-[200px] sm:h-[240px] md:h-[260px]">
                <Image
                  src={movie.image}
                  alt={movie.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  className="object-cover"
                />
              </div>

              {/* TEXT */}
              <div className="p-2 sm:p-3">
                <h2 className="text-sm sm:text-base md:text-lg font-semibold truncate">
                  {movie.title}
                </h2>

                <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">
                  {movie.desc}
                </p>
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}