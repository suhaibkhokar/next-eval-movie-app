"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const scrollRef = useRef(null);

 const movies = [
  {
    id: 1,
    title: "BATMAN",
    subtitle: "THE DARK KNIGHT",
    image: "/movie.jpg",
    rating: 4,
    description:
      "A billionaire vigilante who rises from darkness to protect Gotham City from crime, corruption, and chaos. Batman battles his inner demons while facing some of the most dangerous criminals ever seen in the city.",
  },
  {
    id: 2,
    title: "GODZILLA",
    subtitle: "KING OF THE MONSTERS",
    image: "/movie1.jpg",
    rating: 4,
    description:
      "When ancient titans rise from the depths of the earth, humanity finds itself powerless. Godzilla emerges as both destroyer and protector in an epic battle to restore balance to the world.",
  },
  {
    id: 3,
    title: "UNCHARTED",
    subtitle: "FORTUNE HUNTERS",
    image: "/movie2.jpg",
    rating: 4,
    description:
      "A young treasure hunter teams up with a seasoned adventurer to uncover lost secrets and ancient relics. Their journey takes them across dangerous lands filled with betrayal, puzzles, and hidden fortunes.",
  },
  {
    id: 4,
    title: "AMBULANCE",
    subtitle: "RACE AGAINST TIME",
    image: "/movie.jpg",
    rating: 4,
    description:
      "Two brothers turn a routine bank robbery into a high-speed nightmare when they hijack an ambulance. A wounded cop inside forces them into a desperate race against time and survival.",
  },
  {
    id: 5,
    title: "TURNING RED",
    subtitle: "GROWING UP FAST",
    image: "/movie1.jpg",
    rating: 4,
    description:
      "A teenage girl struggles with emotions, identity, and family expectations while discovering a mysterious transformation that changes her life in unexpected and emotional ways.",
  },
  {
    id: 6,
    title: "AVENGERS",
    subtitle: "ENDGAME",
    image: "/movie2.jpg",
    rating: 4,
    description:
      "After devastating loss across the universe, Earth's mightiest heroes assemble for one final mission. Time travel, sacrifice, and unity decide the fate of all existence.",
  },
];
  const [selectedMovie, setSelectedMovie] = useState(movies[1]);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -180 : 180,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-screen w-full text-white overflow-hidden">

      {/* 🎬 BACKGROUND WITH ZOOM */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedMovie.image}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={selectedMovie.image}
            alt="hero"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* CONTENT */}
      <div className="absolute inset-0 z-10 flex flex-col px-4 sm:px-6 md:px-8 lg:px-10">

        <div className="mt-20 sm:mt-28 md:mt-40 lg:mt-48 max-w-[520px]">

          {/* TEXT ANIMATION */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMovie.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-black uppercase sm:text-4xl md:text-6xl lg:text-7xl">
                {selectedMovie.title}
              </h1>

              <h2 className="mt-2 text-lg sm:text-xl md:text-2xl text-cyan-200 uppercase">
                {selectedMovie.subtitle}
              </h2>

              <p className="mt-3 text-xs sm:text-sm text-white/80 max-w-[420px] line-clamp-3 sm:line-clamp-none">
                {selectedMovie.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* ⭐ RATING */}
          <div className="mt-3 sm:mt-4 text-yellow-400 text-base sm:text-lg">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>{i < selectedMovie.rating ? "★" : "☆"}</span>
            ))}
          </div>

          {/* 🔥 BUTTONS */}
          <div className="mt-4 sm:mt-5 flex gap-3 sm:gap-4">
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px #22d3ee" }}
              whileTap={{ scale: 0.95 }}
              className="bg-cyan-400 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-black text-sm sm:text-base font-semibold"
            >
              Watch Now
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              className="underline text-cyan-200 text-sm sm:text-base"
            >
              Trailer
            </motion.button>
          </div>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg font-semibold">
            Popular Movies
          </p>

        </div>

        {/* 🎞 THUMBNAILS */}
        <div className="mt-3 sm:mt-4">
          <div className="relative w-fit max-w-full">
            <div className="relative rounded-md overflow-hidden px-2 sm:px-3 py-2 sm:py-3">

              <div className="absolute inset-0 bg-gradient-to-r from-[#1e5f90]/60 to-[#0b2a3f]/40" />
              <div className="absolute inset-0 backdrop-blur-[4px]" />

              <div className="relative z-10 flex items-center">

                {/* LEFT */}
                <button
                  onClick={() => scroll("left")}
                  className="absolute left-0.5 sm:left-1 z-20 text-white text-xl sm:text-2xl bg-white/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full hover:bg-white/20 transition"
                >
                  ‹
                </button>

                {/* SCROLL */}
                <div
                  ref={scrollRef}
                  className="flex gap-2 sm:gap-3 overflow-x-auto scroll-smooth px-5 sm:px-6 [&::-webkit-scrollbar]:hidden"
                >
                  {movies.map((movie) => (
                    <motion.button
                      key={movie.id}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedMovie(movie)}
                      className={`min-w-[75px] sm:min-w-[100px] border transition ${
                        selectedMovie.id === movie.id
                          ? "border-cyan-300 scale-105 shadow-lg shadow-cyan-500/50"
                          : "border-transparent hover:border-white/30"
                      }`}
                    >
                      <div className="relative h-[110px] w-[75px] sm:h-[140px] sm:w-[100px]">
                        <Image
                          src={movie.image}
                          alt={movie.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* RIGHT */}
                <button
                  onClick={() => scroll("right")}
                  className="absolute right-0.5 sm:right-1 z-20 text-white text-xl sm:text-2xl bg-white/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full hover:bg-white/20 transition"
                >
                  ›
                </button>

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}