"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Star, TrendingUp, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { fetchTVShows, getImageUrl } from "../lib/tmdb";

export default function TVShowsPage() {
  const router = useRouter();

  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hoveredShow, setHoveredShow] = useState(null); // ✅ only once

  useEffect(() => {
    setLoading(true);
    fetchTVShows(page)
      .then(setShows)
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="min-h-screen bg-black px-4 pt-20 pb-10">
      {/* BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full text-white"
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-white mb-6">
        TV Shows
      </h1>

      {/* LOADING */}
      {loading && (
        <p className="text-white text-center">Loading...</p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {shows.map((show) => (
          <motion.div
            key={show.id}
            onHoverStart={() => setHoveredShow(show.id)}
            onHoverEnd={() => setHoveredShow(null)}
            whileHover={{ scale: 1.05 }}
            className="relative bg-gray-900 rounded-xl overflow-hidden cursor-pointer"
          >
            {/* IMAGE */}
            <div className="relative h-64 w-full">
              <Image
                src={getImageUrl(show.poster_path)}
                alt={show.name}
                fill
                className="object-cover"
              />
            </div>

            {/* HOVER OVERLAY */}
            <motion.div
              animate={{
                opacity: hoveredShow === show.id ? 1 : 0,
              }}
              className="absolute inset-0 bg-black/70 flex flex-col justify-end p-4"
            >
              <h2 className="text-white font-bold text-lg">
                {show.name}
              </h2>

              <div className="flex items-center gap-2 mt-1">
                <Star className="text-yellow-400" size={14} />
                <span className="text-yellow-300 text-sm">
                  {show.vote_average?.toFixed(1)}
                </span>
              </div>

              <button className="mt-3 flex items-center justify-center gap-2 bg-cyan-500 px-3 py-2 rounded-lg text-black font-semibold">
                <Play size={16} /> Watch
              </button>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}