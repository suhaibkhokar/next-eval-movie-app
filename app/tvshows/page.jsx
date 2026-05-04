"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Star, TrendingUp, ArrowLeft, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TVShowsPage() {
  const router = useRouter();
  const [hoveredShow, setHoveredShow] = useState(null);

  const tvShows = [
    {
      id: 1,
      title: "Stranger Things",
      image: "/movie.jpg",
      rating: 4.8,
      genre: "Sci-Fi • Horror",
      seasons: "4 Seasons",
      desc: "A group of kids face supernatural forces in a small town.",
      trending: true,
    },
    {
      id: 2,
      title: "The Last of Us",
      image: "/movie1.jpg",
      rating: 4.9,
      genre: "Drama • Action",
      seasons: "1 Season",
      desc: "A journey through a post-apocalyptic world.",
      trending: true,
    },
    {
      id: 3,
      title: "Breaking Bad",
      image: "/movie2.jpg",
      rating: 5.0,
      genre: "Crime • Drama",
      seasons: "5 Seasons",
      desc: "A chemistry teacher turned meth kingpin.",
      trending: false,
    },
    {
      id: 4,
      title: "Wednesday",
      image: "/movie.jpg",
      rating: 4.5,
      genre: "Comedy • Mystery",
      seasons: "1 Season",
      desc: "Wednesday Addams navigates life at Nevermore Academy.",
      trending: true,
    },
    {
      id: 5,
      title: "Game of Thrones",
      image: "/movie1.jpg",
      rating: 4.7,
      genre: "Fantasy • Drama",
      seasons: "8 Seasons",
      desc: "Noble families fight for control of the Iron Throne.",
      trending: false,
    },
    {
      id: 6,
      title: "The Mandalorian",
      image: "/movie2.jpg",
      rating: 4.8,
      genre: "Sci-Fi • Adventure",
      seasons: "3 Seasons",
      desc: "A lone bounty hunter protects a mysterious child.",
      trending: true,
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-950 to-slate-900 px-3 sm:px-4 pb-12 sm:pb-16 pt-20 sm:pt-24 lg:px-8">
      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -right-40 top-60 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-12"
        >
          <h1 className="mb-3 sm:mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent">
            TV Shows
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-400">
            Binge-worthy series and trending shows
          </p>
        </motion.div>

        {/* Trending Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <TrendingUp className="text-pink-500" size={24} />
            <h2 className="text-2xl font-bold text-white">Trending Now</h2>
          </div>
        </motion.div>

        {/* Shows Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tvShows.map((show, index) => (
            <motion.div
              key={show.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredShow(show.id)}
              onHoverEnd={() => setHoveredShow(null)}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 shadow-2xl ring-1 ring-white/10 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-purple-500/30 hover:ring-purple-500/50">
                {/* Trending Badge */}
                {show.trending && (
                  <div className="absolute left-4 top-4 z-20 flex items-center gap-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
                    <TrendingUp size={12} />
                    TRENDING
                  </div>
                )}

                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={show.image}
                    alt={show.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />

                  {/* Play Button Overlay */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: hoveredShow === show.id ? 1 : 0,
                      scale: hoveredShow === show.id ? 1 : 0.8,
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="rounded-full bg-white/20 p-6 backdrop-blur-md ring-2 ring-white/40">
                      <Play className="text-white" size={32} fill="white" />
                    </div>
                  </motion.div>

                  {/* Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="mb-2 text-xl font-bold text-white drop-shadow-lg">
                      {show.title}
                    </h3>
                    
                    <div className="mb-3 flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="text-yellow-400" size={16} fill="currentColor" />
                        <span className="font-semibold text-yellow-400">{show.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-300">
                        <Clock size={14} />
                        <span className="text-xs">{show.seasons}</span>
                      </div>
                    </div>

                    <p className="mb-2 text-xs text-cyan-300">{show.genre}</p>
                    
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: hoveredShow === show.id ? 1 : 0,
                        height: hoveredShow === show.id ? "auto" : 0,
                      }}
                      className="overflow-hidden text-sm text-gray-300"
                    >
                      {show.desc}
                    </motion.p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="p-4">
                  <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 font-semibold text-white shadow-lg transition-all hover:from-purple-500 hover:to-pink-500 hover:shadow-purple-500/50">
                    <Play size={18} fill="white" />
                    Watch Now
                  </button>
                </div>
              </div>

              {/* Glow Effect */}
              <motion.div
                animate={{
                  opacity: hoveredShow === show.id ? 1 : 0,
                }}
                className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-purple-500/40 via-pink-500/40 to-cyan-500/40 blur-xl"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
