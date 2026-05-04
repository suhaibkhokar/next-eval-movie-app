"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Search, Play, Star, Clock, X, TrendingUp, Sparkles, ArrowLeft } from "lucide-react";

export default function SearchPageClient() {
  const params = useSearchParams();
  const query = params.get("query")?.toLowerCase() || "";

  const cardRefs = useRef({});
  const router = useRouter();

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [hoveredCard, setHoveredCard] = useState(null);

  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function load() {
      const { fetchPopularMovies } = await import("../lib/tmdb");
      try {
        const data = await fetchPopularMovies();
        setMovies(data);
      } catch (e) {
        setMovies([]);
      }
    }
    load();
  }, []);
// ...existing code...

  // scroll to matched movie
  useEffect(() => {
    if (!query) return;

    const found = movies.find((m) =>
      m.title.toLowerCase().includes(query)
    );

    if (found && cardRefs.current[found.id]) {
      setTimeout(() => {
        cardRefs.current[found.id].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 400);
    }
  }, [query]);

  const filtered = query
    ? movies.filter((m) => m.title && m.title.toLowerCase().includes(query))
    : movies;

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-black px-4 pt-20 text-white">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 hover:bg-cyan-600"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Header */}
        <h1 className="text-3xl font-bold text-cyan-400 mb-2">
          Search Results
        </h1>

        <p className="text-gray-400 mb-6">
          {query ? `Results for "${query}"` : "All Movies"}
        </p>

        {/* No results */}
        {filtered.length === 0 && (
          <div className="text-center text-gray-400 mt-20">
            No results found
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((movie) => (
            <div
              key={movie.id}
              ref={(el) => (cardRefs.current[movie.id] = el)}
              className="bg-slate-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition"
            >
              <div className="relative h-60">
                <Image
                  src={require("../lib/tmdb").getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h2 className="text-lg font-bold">{movie.title}</h2>
                <p className="text-sm text-gray-400">{movie.overview}</p>

                <div className="flex gap-3 mt-3">
                  <a
                    href={movie.link}
                    target="_blank"
                    className="bg-cyan-500 px-3 py-1 rounded text-sm"
                  >
                    Watch
                  </a>

                  <button
                    onClick={() => setSelectedMovie(movie)}
                    className="bg-white/10 px-3 py-1 rounded text-sm"
                  >
                    Info
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedMovie && (
            <motion.div
              className="fixed inset-0 bg-black/80 flex items-center justify-center p-4"
              onClick={() => setSelectedMovie(null)}
            >
              <div
                className="bg-slate-900 p-6 rounded-xl max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-bold mb-2">
                  {selectedMovie.title}
                </h2>

                <p className="text-gray-300 mb-4">
                  {selectedMovie.fullDesc}
                </p>

                <button
                  onClick={() => setSelectedMovie(null)}
                  className="bg-red-500 px-4 py-2 rounded"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}