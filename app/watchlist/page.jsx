"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getImageUrl } from "../lib/tmdb";

export default function WatchlistPage() {
  const router = useRouter();
  const [watchlist, setWatchlist] = useState([]);
  const [removing, setRemoving] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(saved);
  }, []);

  const removeFromWatchlist = (movieId) => {
    setRemoving(movieId);
    setTimeout(() => {
      const updated = watchlist.filter((m) => m.id !== movieId);
      setWatchlist(updated);
      localStorage.setItem("watchlist", JSON.stringify(updated));
      setRemoving(null);
    }, 300);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-950 via-slate-900 to-black px-3 sm:px-4 pb-12 sm:pb-16 pt-20 sm:pt-24 lg:px-8">
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 animate-pulse rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute -right-40 top-60 h-96 w-96 animate-pulse rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Back Button */}
        <motion.button
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-800/80 to-slate-700/80 px-6 py-3 font-semibold text-white shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:from-cyan-600 hover:to-purple-600 hover:shadow-cyan-500/50"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </motion.button>

        {/* Header */}
        <div className="mb-10 flex items-center justify-between border-b border-cyan-500/20 pb-6">
          <div>
            <h1 className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl">
              My Watchlist
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              {watchlist.length} {watchlist.length === 1 ? "movie" : "movies"} saved
            </p>
          </div>
          {watchlist.length > 0 && (
            <div className="hidden sm:block">
              <div className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 ring-1 ring-cyan-500/30">
                {watchlist.length} items
              </div>
            </div>
          )}
        </div>

        {/* Empty state */}
        {watchlist.length === 0 ? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <div className="mb-6 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-8 backdrop-blur-sm">
              <svg
                className="h-20 w-20 text-cyan-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-white">Your watchlist is empty</h2>
            <p className="max-w-sm text-gray-400">
              Start adding movies you want to watch later. They'll appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {watchlist.map((movie, index) => (
              <div
                key={movie.id}
                className={`group relative transform transition-all duration-500 ${
                  removing === movie.id ? "scale-75 opacity-0" : "scale-100 opacity-100"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Card */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 shadow-2xl ring-1 ring-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/20 hover:ring-cyan-500/50">
                  {/* Image container */}
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <Image
                      src={getImageUrl(movie.poster_path || movie.image)}
                      alt={movie.title || "Movie poster"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity group-hover:opacity-60" />
                    
                    {/* Remove button */}
                    <button
                      onClick={() => removeFromWatchlist(movie.id)}
                      className="absolute right-3 top-3 rounded-full bg-black/60 p-2 opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-red-600/80 group-hover:opacity-100"
                      aria-label="Remove from watchlist"
                    >
                      <svg
                        className="h-4 w-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>

                    {/* Title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h2 className="mb-2 line-clamp-2 text-lg font-bold text-white drop-shadow-lg">
                        {movie.title}
                      </h2>
                      {movie.desc && (
                        <p className="mb-3 text-xs text-gray-300">{movie.desc}</p>
                      )}
                    </div>
                  </div>

                  {/* Action button */}
                  <div className="p-4">
                    <a
                      href={`https://www.themoviedb.org/movie/${movie.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/50"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Watch Now
                    </a>
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}