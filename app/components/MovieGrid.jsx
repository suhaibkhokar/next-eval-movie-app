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
      initial={{ opacity: 0, scale: 0.96, filter: "blur(16px)" }}
      animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 1.2, type: "spring", bounce: 0.38 }}
      className="relative min-h-screen px-4 py-10 overflow-x-hidden flex flex-col items-center justify-center"
    >
      {/* Animated Waving Background */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={isInView ? { opacity: 0.7, y: 0 } : {}}
        transition={{ duration: 1.2, type: "spring", bounce: 0.4, delay: 0.1 }}
        className="absolute inset-0 -z-10"
        style={{ pointerEvents: 'none' }}
      >
        <svg width="100%" height="100%" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <motion.path
            d="M0,400 Q360,300 720,400 T1440,400 V600 H0 Z"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            fill="url(#waveGradient)"
          />
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="1440" y2="600" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0ea5e9" />
              <stop offset="0.5" stopColor="#6366f1" />
              <stop offset="1" stopColor="#f472b6" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Animated Stylish Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -60, scale: 0.7, rotate: -8 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1.08, rotate: 0 } : {}}
        transition={{ duration: 1, type: "spring", bounce: 0.5 }}
        className="text-center text-4xl sm:text-5xl md:text-6xl font-extrabold mb-12 text-white drop-shadow-[0_0_32px_#fff] tracking-tight animate-bounce"
        style={{ textShadow: '0 0 32px #fff, 0 0 64px #0ea5e9' }}
      >
        <span className="inline-block animate-pulse">🔥 Popular Movies 🔥</span>
      </motion.h1>

      {/* Loader or Movie Grid */}
      {movies.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <motion.div
            initial={{ scale: 0.7, opacity: 0.5 }}
            animate={{ scale: [0.7, 1.1, 0.9, 1], opacity: [0.5, 1, 0.7, 1] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 blur-sm"
          />
          <p className="mt-6 text-lg text-cyan-200 animate-pulse">Loading movies...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {movies.map((movie, i) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: i * 0.09 + 0.3, duration: 0.7, type: "spring", bounce: 0.4 }}
            className="bg-black/80 rounded-xl overflow-hidden text-white shadow-lg border border-cyan-900/30 hover:scale-110 hover:shadow-cyan-500/40 transition-transform duration-300"
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
        </div>
      )}
    </motion.div>
  );
}