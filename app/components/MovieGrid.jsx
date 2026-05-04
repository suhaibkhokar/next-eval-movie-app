"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Star, Zap } from "lucide-react";

export default function MovieGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const movies = [
    {
      id: 1,
      title: "Batman Begins",
      image: "/movie.jpg",
      desc: "A dark origin story of Gotham’s legendary vigilante who rises from fear, training, and loss to become the symbol of justice against corruption and crime.",
      link: "https://youtu.be/BPQOf-aPa0A",
    },
    {
      id: 2,
      title: "The Batman",
      image: "/movie1.jpg",
      desc: "A gritty detective thriller where Batman explores corruption in Gotham while facing the mysterious Riddler in a city full of secrets.",
      link: "https://youtu.be/BJ2VqM1V_hQ",
    },
    {
      id: 3,
      title: "Avengers",
      image: "/movie2.jpg",
      desc: "Earth’s mightiest heroes unite to fight global threats and powerful villains in an epic battle to save humanity from destruction.",
      link: "https://youtu.be/ZiqtPF8eimg",
    },
    {
      id: 4,
      title: "Joker",
      image: "/movie.jpg",
      desc: "A psychological descent into madness of Arthur Fleck, a broken man who transforms into Gotham’s most feared villain.",
      link: "https://youtu.be/vGCQPi430o0",
    },
    {
      id: 5,
      title: "Batman Begins",
      image: "/movie.jpg",
      desc: "A dark origin story of Gotham’s legendary vigilante who rises from fear, training, and loss.",
      link: "https://youtu.be/BPQOf-aPa0A",
    },
    {
      id: 6,
      title: "The Batman",
      image: "/movie1.jpg",
      desc: "A gritty detective thriller uncovering corruption and mystery inside Gotham City.",
      link: "https://youtu.be/BJ2VqM1V_hQ",
    },
    {
      id: 7,
      title: "Avengers",
      image: "/movie2.jpg",
      desc: "Heroes unite against cosmic threats to protect Earth from destruction.",
      link: "https://youtu.be/ZiqtPF8eimg",
    },
    {
      id: 8,
      title: "Joker",
      image: "/movie.jpg",
      desc: "A haunting psychological journey of a man pushed into chaos and darkness.",
      link: "https://youtu.be/vGCQPi430o0",
    },
  ];

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { y: -100, opacity: 0, scale: 0.5, rotateX: -90 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.3,
      rotateY: -180,
      y: 100,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative min-h-screen bg-black text-white px-4 py-6 sm:px-6 md:px-8 md:py-8 overflow-hidden"
    >
      {/* Animated Background Particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              scale: 0,
              opacity: 0,
            }}
            animate={
              isInView
                ? {
                    scale: [0, 1, 0],
                    opacity: [0, 0.6, 0],
                    y: [
                      Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
                      Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
                    ],
                    x: [
                      Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                      Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                    ],
                  }
                : {}
            }
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            <Sparkles className="text-cyan-400" size={Math.random() * 20 + 10} />
          </motion.div>
        ))}
      </div>

      {/* Animated Background Blobs */}
      <motion.div
        animate={
          isInView
            ? {
                scale: [1, 1.3, 1],
                x: [0, 100, 0],
                y: [0, 80, 0],
                rotate: [0, 180, 360],
              }
            : {}
        }
        transition={{ duration: 20, repeat: Infinity }}
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl"
      />
      <motion.div
        animate={
          isInView
            ? {
                scale: [1.2, 1, 1.2],
                x: [0, -100, 0],
                y: [0, -80, 0],
                rotate: [360, 180, 0],
              }
            : {}
        }
        transition={{ duration: 25, repeat: Infinity }}
        className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl"
      />

      <div className="relative z-10">
        {/* HEADER with Heavy Animation */}
        <motion.div
          variants={titleVariants}
          className="mb-6 sm:mb-8 md:mb-10 text-center"
        >
          <motion.div
            animate={
              isInView
                ? {
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity }}
            className="relative inline-block"
          >
            <h1 className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-2">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Popular Movies
              </span>
              <motion.span
                animate={
                  isInView
                    ? {
                        rotate: [0, 20, -20, 0],
                        scale: [1, 1.2, 1],
                      }
                    : {}
                }
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2 inline-block"
              >
                🎬
              </motion.span>
            </h1>

            {/* Glow Effect */}
            <motion.div
              animate={
                isInView
                  ? {
                      opacity: [0.3, 0.8, 0.3],
                      scale: [0.8, 1.2, 0.8],
                    }
                  : {}
              }
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-4 -z-10 rounded-lg bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 blur-2xl"
            />

            {/* Floating Icons */}
            <motion.div
              animate={
                isInView
                  ? {
                      y: [-10, 10, -10],
                      rotate: [0, 360],
                    }
                  : {}
              }
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -left-8 sm:-left-12 top-0"
            >
              <Star className="text-yellow-400" size={24} fill="currentColor" />
            </motion.div>
            <motion.div
              animate={
                isInView
                  ? {
                      y: [10, -10, 10],
                      rotate: [360, 0],
                    }
                  : {}
              }
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -right-8 sm:-right-12 top-0"
            >
              <Zap className="text-cyan-400" size={24} fill="currentColor" />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="text-xs sm:text-sm md:text-base text-gray-400"
          >
            Discover amazing movies with stunning visuals
          </motion.p>
        </motion.div>

        {/* GRID with Staggered Animation */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5"
        >
          {movies.map((movie, i) => (
            <motion.div
              key={movie.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.08,
                rotateY: 5,
                z: 50,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-lg"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Hover Glow Effect */}
              <motion.div
                className="absolute -inset-1 -z-10 rounded-xl bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-pink-500/40 opacity-0 blur-xl transition-opacity group-hover:opacity-100"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />

              {/* Shine Effect on Hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />

              {/* IMAGE */}
              <div className="relative h-[180px] sm:h-[220px] md:h-64 overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.5 }}
                  className="h-full w-full"
                >
                  <Image
                    src={movie.image}
                    alt={movie.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    className="object-cover"
                  />
                </motion.div>

                {/* OVERLAY */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex items-end p-2 sm:p-3"
                >
                  <p className="text-[10px] sm:text-xs text-gray-300 line-clamp-3">
                    {movie.desc}
                  </p>
                </motion.div>

                {/* Floating Badge */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.5 }}
                  className="absolute right-2 top-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-2 py-1 text-[10px] font-bold text-black shadow-lg"
                >
                  ⭐ Popular
                </motion.div>
              </div>

              {/* TEXT */}
              <div className="p-2 sm:p-3">
                <motion.h2
                  initial={{ x: -20, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="text-sm sm:text-base md:text-lg font-semibold group-hover:text-cyan-300 transition truncate"
                >
                  {movie.title}
                </motion.h2>

                {/* DESCRIPTION */}
                <motion.p
                  initial={{ x: -20, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: i * 0.1 + 0.4 }}
                  className="text-[10px] sm:text-xs md:text-sm text-gray-400 mt-1 sm:mt-2 mb-2 sm:mb-3 line-clamp-2 sm:line-clamp-3"
                >
                  {movie.desc}
                </motion.p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: i * 0.1 + 0.5 }}
                  className="flex flex-col gap-1.5 sm:gap-2"
                >
                  <motion.button
                    onClick={() => toggleFavorite(movie)}
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs rounded-lg font-semibold transition-all ${
                      isFav(movie.id)
                        ? "bg-gradient-to-r from-red-600 to-pink-600 shadow-lg shadow-red-500/50"
                        : "bg-gray-700 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500"
                    }`}
                  >
                    ❤️ Like
                  </motion.button>

                  <motion.button
                    onClick={() => toggleWatch(movie)}
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs rounded-lg font-semibold transition-all ${
                      isWatch(movie.id)
                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg shadow-blue-500/50"
                        : "bg-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500"
                    }`}
                  >
                    📌 Watchlist
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}