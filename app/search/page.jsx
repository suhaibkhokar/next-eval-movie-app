"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Search, Play, Star, Clock, X, TrendingUp, Sparkles, ArrowLeft } from "lucide-react";

export default function SearchPage() {
  const params = useSearchParams();
  const query = params.get("query")?.toLowerCase() || "";
  const cardRefs = useRef({});
  const router = useRouter();

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [hoveredCard, setHoveredCard] = useState(null);

  const movies = [
    {
      id: 1,
      title: "Batman Begins",
      image: "/movie.jpg",
      desc: "Action • Adventure • A young Bruce Wayne rises from darkness to become Gotham’s protector.",
      link: "https://youtu.be/BPQOf-aPa0A",
    },
    {
      id: 2,
      title: "The Batman",
      image: "/movie1.jpg",
      desc: "Dark • Thriller • A detective-style Batman uncovers hidden corruption in Gotham City.",
      link: "https://youtu.be/BJ2VqM1V_hQ",
    },
    {
      id: 3,
      title: "Avengers",
      image: "/movie2.jpg",
      desc: "Action • Marvel • Earth’s greatest heroes unite to fight global destruction.",
      link: "https://youtu.be/ZiqtPF8eimg",
    },
    {
      id: 4,
      title: "Joker",
      image: "/movie.jpg",
      desc: "Drama • Crime • A psychological journey into chaos and madness.",
      link: "https://youtu.be/vGCQPi430o0",
    },
  ];

  useEffect(() => {
    if (!query) return;

    const found = movies.find((m) => m.title.toLowerCase().includes(query));

    if (found && cardRefs.current[found.id]) {
      setTimeout(() => {
        cardRefs.current[found.id].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 500);
    }
  }, [query]);

  const filtered = query
    ? movies.filter((m) => m.title.toLowerCase().includes(query))
    : movies;

  return (
    <>
      {/* Animated particle background - reduced on mobile */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full bg-gradient-to-r from-cyan-400/30 to-purple-400/30 ${
              i > 10 ? "hidden sm:block" : ""
            }`}
            style={{
              width: Math.random() * 6 + 2 + "px",
              height: Math.random() * 6 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, Math.random() * 200 - 100, 0],
              x: [0, Math.random() * 200 - 100, 0],
              scale: [1, Math.random() + 0.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-black px-3 sm:px-4 pb-16 pt-20 sm:pt-24 lg:px-8"
      >
        {/* Animated background blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 80, 0],
              y: [0, 60, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.3, 1, 1.3],
              x: [0, -80, 0],
              y: [0, -60, 0],
            }}
            transition={{ duration: 22, repeat: Infinity }}
            className="absolute -right-40 top-60 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl"
          />
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* Back Button */}
          <motion.button
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => router.back()}
            className="mb-4 sm:mb-6 flex items-center gap-1.5 sm:gap-2 rounded-full bg-gradient-to-r from-slate-800/80 to-slate-700/80 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:from-cyan-600 hover:to-purple-600 hover:shadow-cyan-500/50"
          >
            <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
            <span>Back</span>
          </motion.button>

          {/* Header Section */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6 sm:mb-10"
          >
            <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Search className="text-cyan-400" size={32} />
              </motion.div>
              <div>
                <h1 className="mb-1 sm:mb-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-2xl font-black text-transparent sm:text-4xl md:text-5xl lg:text-6xl">
                  Search Results
                </h1>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm sm:text-base md:text-lg text-gray-400"
                >
                  {query ? (
                    <>
                      Showing results for{" "}
                      <span className="font-bold text-cyan-400">"{query}"</span>
                    </>
                  ) : (
                    "Browse all available content"
                  )}
                </motion.p>
              </div>
            </div>

            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3"
            >
              <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-cyan-300 ring-1 ring-cyan-500/30 backdrop-blur-sm">
                <TrendingUp size={14} className="sm:w-4 sm:h-4" />
                <span>{filtered.length} Results Found</span>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="rounded-full bg-gradient-to-r from-slate-800/80 to-slate-700/80 px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white backdrop-blur-sm transition-all hover:from-purple-600 hover:to-cyan-600"
              >
                {viewMode === "grid" ? "List View" : "Grid View"}
              </motion.button>
            </motion.div>
          </motion.div>

          {/* No Results */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex min-h-[50vh] flex-col items-center justify-center text-center px-4"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-6 sm:p-8"
              >
                <Search className="text-gray-400" size={48} />
              </motion.div>
              <h2 className="mb-2 text-xl sm:text-2xl md:text-3xl font-bold text-white">No results found</h2>
              <p className="text-sm sm:text-base text-gray-400">Try searching with different keywords</p>
            </motion.div>
          )}

          {/* Results Grid */}
          <motion.div
            layout
            className={`${
              viewMode === "grid"
                ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "flex flex-col gap-4"
            }`}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  ref={(el) => (cardRefs.current[movie.id] = el)}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 100,
                  }}
                  onHoverStart={() => setHoveredCard(movie.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="group relative"
                >
                  <div
                    className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 shadow-2xl ring-1 ring-white/10 backdrop-blur-sm transition-all duration-500 ${
                      viewMode === "grid"
                        ? "hover:scale-105"
                        : "flex gap-4 hover:bg-slate-800/80"
                    } hover:shadow-cyan-500/30 hover:ring-cyan-500/50`}
                  >
                    {/* Image */}
                    <div
                      className={`relative overflow-hidden ${
                        viewMode === "grid" ? "aspect-[2/3]" : "h-40 w-28 shrink-0"
                      }`}
                    >
                      <Image
                        src={movie.image}
                        alt={movie.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />

                      {/* Play Button Overlay */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: hoveredCard === movie.id ? 1 : 0,
                          scale: hoveredCard === movie.id ? 1 : 0.5,
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="rounded-full bg-white/20 p-4 backdrop-blur-md ring-2 ring-white/40">
                          <Play className="text-white" size={viewMode === "grid" ? 32 : 24} fill="white" />
                        </div>
                      </motion.div>

                      {/* Rating Badge */}
                      <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs font-bold text-yellow-400 backdrop-blur-sm">
                        <Star size={12} fill="currentColor" />
                        {movie.rating}
                      </div>

                      {viewMode === "grid" && (
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="mb-1 text-lg font-bold text-white drop-shadow-lg">
                            {movie.title}
                          </h3>
                          <p className="text-xs text-cyan-300">{movie.desc}</p>
                        </div>
                      )}
                    </div>

                    {/* Content (List View) */}
                    {viewMode === "list" && (
                      <div className="flex flex-1 flex-col justify-between p-4">
                        <div>
                          <h3 className="mb-2 text-xl font-bold text-white">
                            {movie.title}
                          </h3>
                          <p className="mb-2 text-sm text-cyan-300">{movie.desc}</p>
                          <p className="mb-3 text-sm text-gray-400 line-clamp-2">
                            {movie.fullDesc}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span>{movie.year}</span>
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              {movie.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className={viewMode === "grid" ? "p-4" : "flex items-center pr-4"}>
                      <div className="flex gap-2">
                        <a
                          href={movie.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/50"
                        >
                          <Play size={16} fill="white" />
                          Watch
                        </a>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedMovie(movie)}
                          className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                        >
                          Info
                        </motion.button>
                      </div>
                    </div>

                    {/* Sparkle effect on hover */}
                    {hoveredCard === movie.id && (
                      <motion.div
                        className="pointer-events-none absolute right-4 top-4"
                        animate={{
                          rotate: [0, 180, 360],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles className="text-cyan-400" size={20} />
                      </motion.div>
                    )}
                  </div>

                  {/* Glow Effect */}
                  <motion.div
                    animate={{
                      opacity: hoveredCard === movie.id ? 1 : 0,
                    }}
                    className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-pink-500/40 blur-xl"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      {/* Info Modal */}
      <AnimatePresence>
        {selectedMovie && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setSelectedMovie(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="relative max-w-2xl overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-purple-950 shadow-2xl ring-2 ring-cyan-500/50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMovie(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 backdrop-blur-sm transition-all hover:bg-red-600/80"
              >
                <X className="text-white" size={20} />
              </button>

              {/* Image Header */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={selectedMovie.image}
                  alt={selectedMovie.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="mb-2 text-4xl font-black text-white drop-shadow-lg">
                    {selectedMovie.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-yellow-400">
                      <Star size={16} fill="currentColor" />
                      <span className="font-bold">{selectedMovie.rating}</span>
                    </span>
                    <span className="text-gray-300">{selectedMovie.year}</span>
                    <span className="flex items-center gap-1 text-gray-300">
                      <Clock size={14} />
                      {selectedMovie.duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="mb-2 text-sm font-semibold text-cyan-400">
                  {selectedMovie.desc}
                </p>
                <p className="mb-6 text-gray-300">{selectedMovie.fullDesc}</p>

                <a
                  href={selectedMovie.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 font-bold text-white shadow-lg transition-all hover:from-cyan-400 hover:to-purple-500 hover:shadow-cyan-500/50"
                >
                  <Play size={20} fill="white" />
                  Watch Now
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}