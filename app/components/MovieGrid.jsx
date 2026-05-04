"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fetchPopularMovies, getImageUrl } from "../lib/tmdb";

export default function MovieGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem("favorites")) || [];
    const watch = JSON.parse(localStorage.getItem("watchlist")) || [];
    setFavorites(fav);
    setWatchlist(watch);
  }, []);

  const toggleFavorite = (movie) => {
    const exists = favorites.find((m) => m.id === movie.id);
    const updated = exists
      ? favorites.filter((m) => m.id !== movie.id)
      : [...favorites, movie];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const toggleWatch = (movie) => {
    const exists = watchlist.find((m) => m.id === movie.id);
    const updated = exists
      ? watchlist.filter((m) => m.id !== movie.id)
      : [...watchlist, movie];
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  const isFav = (id) => favorites.some((m) => m.id === id);
  const isWatch = (id) => watchlist.some((m) => m.id === id);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchPopularMovies();
        setMovies(data);
      } catch (err) {
        console.log("API Error:", err);
      }
    }

    load();
  }, []);

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4"
    >
      {movies.map((movie, i) => (
        <motion.div
          key={movie.id}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.05 }}
          className="bg-black rounded-xl overflow-hidden text-white shadow-lg"
        >
          {/* IMAGE */}
          <div className="relative h-[250px] w-full">
            <Image
              src={getImageUrl(movie.poster_path)}
              alt={movie.title || "movie"}
              fill
              className="object-cover"
              priority={i < 4}
            />
          </div>

          {/* INFO */}
          <div className="p-3">
            <h2 className="font-bold text-sm md:text-base">
              {movie.title}
            </h2>
            <p className="text-xs text-gray-400 line-clamp-2 mt-1">
              {movie.overview}
            </p>
            <div className="flex flex-col gap-2 mt-3">
              <button
                onClick={() => toggleFavorite(movie)}
                className={`px-2 py-1 text-xs rounded font-semibold transition-all ${
                  isFav(movie.id)
                    ? "bg-gradient-to-r from-red-600 to-pink-600 text-white shadow"
                    : "bg-gray-700 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 text-white"
                }`}
              >
                ❤️ Like
              </button>
              <button
                onClick={() => toggleWatch(movie)}
                className={`px-2 py-1 text-xs rounded font-semibold transition-all ${
                  isWatch(movie.id)
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow"
                    : "bg-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 text-white"
                }`}
              >
                📌 Watchlist
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}