                      "use client";
                      // ...existing code...
// ...existing code...
// ...existing code...
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchPopularMovies, getImageUrl } from "../lib/tmdb";

export default function Hero() {
  const scrollRef = useRef(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalMovie, setModalMovie] = useState(null);

  useEffect(() => {
    fetchPopularMovies().then((data) => {
      setMovies(data);
      setSelectedMovie(data[0]);
    });
  }, []);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -120 : 120,
      behavior: "smooth",
    });
  };

  // Modal close handler
  const closeModal = () => setModalMovie(null);

  return (
    <section className="relative h-screen w-full text-white overflow-hidden">

      {/* 🎬 BACKGROUND WITH ZOOM */}
      <AnimatePresence mode="wait">
        {selectedMovie && (
          <motion.div
            key={selectedMovie.backdrop_path || selectedMovie.id}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={getImageUrl(selectedMovie.backdrop_path)}
              alt={selectedMovie.title}
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* CONTENT */}
      <div className="absolute inset-0 z-10 flex flex-col px-4 sm:px-6 md:px-8 lg:px-10">

        <div className="mt-20 sm:mt-28 md:mt-40 lg:mt-48 max-w-130">

          {/* TEXT ANIMATION */}
          <AnimatePresence mode="wait">
            {selectedMovie && (
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
                  {selectedMovie.release_date}
                </h2>
                <p className="mt-3 text-xs sm:text-sm text-white/80 max-w-105 line-clamp-3 sm:line-clamp-none">
                  {selectedMovie.overview}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ⭐ RATING */}
          {selectedMovie && (
            <div className="mt-3 sm:mt-4 text-yellow-400 text-base sm:text-lg">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>{i < Math.round(selectedMovie.vote_average / 2) ? "★" : "☆"}</span>
              ))}
            </div>
          )}

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
        <div className="mt-1 sm:mt-2">
          <div className="relative w-full max-w-150">
            <div className="relative rounded-md overflow-hidden px-2 sm:px-3 pt-7 pb-3 sm:pt-10 sm:pb-4 h-35 sm:h-42.5 flex items-center">
              <div className="absolute inset-0 bg-linear-to-r from-[#1e5f90]/60 to-[#0b2a3f]/40 h-full" />
              <div className="absolute inset-0 backdrop-blur-xs h-full" />
              <div className="relative z-10 flex items-center w-full justify-center">
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
                  className="flex gap-2 sm:gap-3 overflow-x-auto scroll-smooth px-5 sm:px-6 [&::-webkit-scrollbar]:hidden w-105 sm:w-135"
                  style={{ maxWidth: '100%' }}
                >
                  {movies.map((movie) => (
                    <motion.button
                      key={movie.id}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setModalMovie(movie)}
                      className={`min-w-18.75 sm:min-w-25 border transition ${
                        selectedMovie && selectedMovie.id === movie.id
                          ? "border-cyan-300 scale-105 shadow-lg shadow-cyan-500/50"
                          : "border-transparent hover:border-white/30"
                      }`}
                    >
                      <div className="relative h-27.5 w-18.75 sm:h-35 sm:w-25">
                        <Image
                          src={getImageUrl(movie.poster_path)}
                          alt={movie.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-xs sm:text-sm text-center mt-1 font-semibold truncate w-full max-w-22.5 mx-auto">
                        {movie.title}
                      </div>
                    </motion.button>
                  ))}
                      {/* MODAL for full poster, title, description */}
                      <AnimatePresence>
                        {modalMovie && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                            onClick={closeModal}
                          >
                            <motion.div
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.9, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="relative bg-[#101624] rounded-2xl shadow-2xl p-4 sm:p-8 flex flex-col items-center max-w-[95vw] max-h-[90vh]"
                              onClick={e => e.stopPropagation()}
                            >
                              <button
                                onClick={closeModal}
                                className="absolute top-2 right-2 text-white bg-black/40 rounded-full px-2 py-1 text-lg hover:bg-black/70 transition"
                                aria-label="Close"
                              >
                                ×
                              </button>
                              <div className="w-45 sm:w-60 h-67.5 sm:h-90 relative mb-4">
                                <Image
                                  src={getImageUrl(modalMovie.poster_path)}
                                  alt={modalMovie.title}
                                  fill
                                  className="object-cover rounded-xl shadow-lg"
                                />
                              </div>
                              <h2 className="text-xl sm:text-2xl font-bold text-cyan-300 text-center mb-2">{modalMovie.title}</h2>
                              <p className="text-white/90 text-center mb-2 text-sm sm:text-base max-w-[320px]">{modalMovie.overview}</p>
                              <div className="text-yellow-400 text-lg mb-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <span key={i}>{i < Math.round(modalMovie.vote_average / 2) ? "★" : "☆"}</span>
                                ))}
                              </div>
                              <span className="text-xs text-cyan-200">Release: {modalMovie.release_date}</span>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
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
      {/* MODAL for full poster, title, description */}
      <AnimatePresence>
        {modalMovie && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm pt-16 sm:pt-20"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative bg-[#101624] rounded-2xl shadow-2xl p-4 sm:p-8 flex flex-col items-center max-w-[95vw] max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-white bg-black/40 rounded-full px-2 py-1 text-lg hover:bg-black/70 transition"
                aria-label="Close"
              >
                ×
              </button>
              <div className="w-45 sm:w-60 h-67.5 sm:h-90 relative mb-4">
                <Image
                  src={getImageUrl(modalMovie.poster_path)}
                  alt={modalMovie.title}
                  fill
                  className="object-cover rounded-xl shadow-lg"
                />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-cyan-300 text-center mb-2">{modalMovie.title}</h2>
              <p className="text-white/90 text-center mb-2 text-sm sm:text-base max-w-[320px]">{modalMovie.overview}</p>
              <div className="text-yellow-400 text-lg mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < Math.round(modalMovie.vote_average / 2) ? "★" : "☆"}</span>
                ))}
              </div>
              <span className="text-xs text-cyan-200">Release: {modalMovie.release_date}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}