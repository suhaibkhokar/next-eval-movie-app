"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchPopularMovies, getImageUrl } from "../lib/tmdb";

export default function Hero() {
  const scrollRef = useRef(null);
  const [movies, setMovies] = useState([]);
  const [mainMovie, setMainMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchPopularMovies().then((data) => {
      setMovies(data);
      setMainMovie(data[0]);
    });
  }, []);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -220 : 220, // 🔥 more scroll distance
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-screen w-full text-white overflow-hidden">

      {/* 🎬 BIGGER BACKGROUND */}
      <AnimatePresence mode="wait">
        {mainMovie && (
          <motion.div
            key={mainMovie.id}
            initial={{ scale: 1.4, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={getImageUrl(mainMovie.backdrop_path)}
              alt={mainMovie.title}
              fill
              priority
              className="object-cover scale-125" // 🔥 BIGGER
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/60" />

      {/* CONTENT */}
      <div className="absolute inset-0 z-20 flex flex-col px-6 md:px-10">

        <div className="mt-[28vh] max-w-[600px]">

          <h1 className="text-4xl md:text-5xl font-black">
            {mainMovie?.title}
          </h1>

          <p className="mt-3 text-base text-white/80 line-clamp-2">
            {mainMovie?.overview}
          </p>

          <p className="mt-6 text-lg font-semibold">
            Popular Movies
          </p>

          {/* 🎞 BIGGER THUMBNAILS */}
          <div className="mt-4">

            <div className="relative w-full max-w-[1000px]">

              <div className="relative rounded-xl overflow-hidden px-4 pt-6 pb-4 h-[200px] flex items-center bg-black/60 backdrop-blur-md shadow-2xl">

                {/* LEFT */}
                <button
                  onClick={() => scroll("left")}
                  className="absolute left-1 z-40 text-3xl bg-white/10 px-2 rounded-full"
                >
                  ‹
                </button>

                {/* SCROLL */}
                <div
                  ref={scrollRef}
                  className="flex gap-5 overflow-x-auto px-12 w-full scroll-smooth [&::-webkit-scrollbar]:hidden"
                >
                  {movies.slice(0, 12).map((movie) => (
                    <motion.div
                      key={movie.id}
                      whileHover={{ scale: 1.15 }}
                      onClick={() => setSelectedMovie(movie)}
                      className="min-w-[140px] cursor-pointer" // 🔥 BIGGER WIDTH
                    >
                      <div className="relative h-[180px] w-[140px]"> {/* 🔥 BIGGER */}
                        <Image
                          src={getImageUrl(movie.poster_path)}
                          alt={movie.title}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>

                      <p className="text-sm text-center mt-2 truncate">
                        {movie.title}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* RIGHT */}
                <button
                  onClick={() => scroll("right")}
                  className="absolute right-1 z-40 text-3xl bg-white/10 px-2 rounded-full"
                >
                  ›
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 MODAL */}
      <AnimatePresence>
        {selectedMovie && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
              className="bg-gray-900 p-6 rounded-xl w-[90%] max-w-md relative"
            >

              <button
                onClick={() => setSelectedMovie(null)}
                className="absolute top-2 right-3 text-xl"
              >
                ✕
              </button>

              <Image
                src={getImageUrl(selectedMovie.poster_path)}
                alt={selectedMovie.title}
                width={300}
                height={400}
                className="rounded mb-4 mx-auto"
              />

              <h2 className="text-xl font-bold text-center mb-2">
                {selectedMovie.title}
              </h2>

              <p className="text-sm text-gray-300 text-center">
                {selectedMovie.overview}
              </p>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}