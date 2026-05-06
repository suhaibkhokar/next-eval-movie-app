"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Star,
  X,
  Heart,
  Bookmark,
} from "lucide-react";
import { fetchDocumentaries, getImageUrl } from "../lib/tmdb";

export default function DocumentariesPage() {
  const [docs, setDocs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [selectedDoc, setSelectedDoc] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchDocumentaries(page)
      .then(setDocs)
      .finally(() => setLoading(false));
  }, [page]);

  const toggleWatchlist = (doc) => {
    setWatchlist((prev) =>
      prev.some((item) => item.id === doc.id)
        ? prev.filter((item) => item.id !== doc.id)
        : [...prev, doc]
    );
  };

  const toggleFavorites = (doc) => {
    setFavorites((prev) =>
      prev.some((item) => item.id === doc.id)
        ? prev.filter((item) => item.id !== doc.id)
        : [...prev, doc]
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-cyan-300">
        Documentaries
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-cyan-200">
            Loading...
          </div>
        ) : (
          docs.map((doc) => (
            <motion.div
              key={doc.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedDoc(doc)}
              className="cursor-pointer bg-[#101624] rounded-xl overflow-hidden shadow-lg"
            >
              <div className="relative w-full h-52">
                <Image
                  src={getImageUrl(doc.poster_path)}
                  alt={doc.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-3">
                <h2 className="text-sm font-bold text-cyan-200 line-clamp-1">
                  {doc.title}
                </h2>

                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs text-yellow-300">
                    {doc.vote_average?.toFixed(1)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-4 py-2 bg-cyan-400 text-black rounded-full"
        >
          <ArrowLeft className="inline w-4 h-4 mr-1" /> Prev
        </button>

        <span className="text-cyan-200 font-bold">Page {page}</span>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-cyan-400 text-black rounded-full"
        >
          Next <ArrowRight className="inline w-4 h-4 ml-1" />
        </button>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedDoc && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDoc(null)}
          >
            <motion.div
              className="bg-[#0f172a] rounded-2xl max-w-3xl w-full overflow-hidden"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* IMAGE */}
              <div className="relative w-full h-64">
                <Image
                  src={getImageUrl(selectedDoc.backdrop_path)}
                  alt={selectedDoc.title}
                  fill
                  className="object-cover"
                />

                <button
                  onClick={() => setSelectedDoc(null)}
                  className="absolute top-3 right-3 bg-black/60 p-2 rounded-full"
                >
                  <X className="text-white" />
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {selectedDoc.title}
                </h2>

                <p className="text-gray-300 mb-4">
                  {selectedDoc.overview}
                </p>

                <div className="flex items-center gap-4 mb-4">
                  <Star className="text-yellow-400" />
                  <span className="text-yellow-300">
                    {selectedDoc.vote_average?.toFixed(1)}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-3">
                  <button
                    onClick={() => toggleWatchlist(selectedDoc)}
                    className={`px-4 py-2 rounded-lg ${
                      watchlist.some((i) => i.id === selectedDoc.id)
                        ? "bg-cyan-500"
                        : "bg-white/10"
                    }`}
                  >
                    <Bookmark />
                  </button>

                  <button
                    onClick={() => toggleFavorites(selectedDoc)}
                    className={`px-4 py-2 rounded-lg ${
                      favorites.some((i) => i.id === selectedDoc.id)
                        ? "bg-pink-500"
                        : "bg-white/10"
                    }`}
                  >
                    <Heart />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}