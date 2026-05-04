"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Calendar, Award, Play, ArrowLeft, Bookmark, Heart, X, Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DocumentariesPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [watchlist, setWatchlist] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);

  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setWatchlist(savedWatchlist);
    setFavorites(savedFavorites);
  }, []);

  const toggleWatchlist = (doc) => {
    const isInWatchlist = watchlist.some((item) => item.id === doc.id);
    let newWatchlist;
    if (isInWatchlist) {
      newWatchlist = watchlist.filter((item) => item.id !== doc.id);
    } else {
      newWatchlist = [...watchlist, doc];
    }
    setWatchlist(newWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(newWatchlist));
  };

  const toggleFavorites = (doc) => {
    const isInFavorites = favorites.some((item) => item.id === doc.id);
    let newFavorites;
    if (isInFavorites) {
      newFavorites = favorites.filter((item) => item.id !== doc.id);
    } else {
      newFavorites = [...favorites, doc];
    }
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const categories = ["All", "Nature", "History", "Science", "Biography"];

  const documentaries = [
    {
      id: 1,
      title: "Planet Earth",
      image: "/movie.jpg",
      category: "Nature",
      year: "2023",
      duration: "8 Episodes",
      rating: 4.9,
      desc: "Explore the wonders of our natural world.",
      fullDesc: "An extraordinary journey across the planet, capturing incredible wildlife behavior and breathtaking landscapes. This groundbreaking series reveals the beauty and drama of life on Earth in unprecedented detail.",
      awards: 3,
      link: "https://www.netflix.com",
    },
    {
      id: 2,
      title: "The Last Dance",
      image: "/movie1.jpg",
      category: "Biography",
      year: "2020",
      duration: "10 Episodes",
      rating: 4.8,
      desc: "Michael Jordan and the Chicago Bulls dynasty.",
      fullDesc: "A deep dive into Michael Jordan's final season with the Chicago Bulls, featuring exclusive footage and interviews about one of basketball's greatest dynasties.",
      awards: 5,
      link: "https://www.netflix.com",
    },
    {
      id: 3,
      title: "Cosmos",
      image: "/movie2.jpg",
      category: "Science",
      year: "2022",
      duration: "13 Episodes",
      rating: 4.9,
      desc: "Journey through space and time.",
      fullDesc: "A stunning exploration of the universe, from the Big Bang to the future of humanity. This series takes viewers on an epic voyage across the cosmos, revealing the mysteries of space and time.",
      awards: 4,
      link: "https://www.netflix.com",
    },
    {
      id: 4,
      title: "Ancient Civilizations",
      image: "/movie.jpg",
      category: "History",
      year: "2021",
      duration: "6 Episodes",
      rating: 4.6,
      desc: "Uncover the mysteries of lost empires.",
      fullDesc: "Travel back in time to explore the rise and fall of history's greatest civilizations. Discover the secrets, achievements, and mysteries that shaped our world.",
      awards: 2,
      link: "https://www.netflix.com",
    },
    {
      id: 5,
      title: "Blue Planet",
      image: "/movie1.jpg",
      category: "Nature",
      year: "2023",
      duration: "7 Episodes",
      rating: 4.8,
      desc: "Dive into the depths of our oceans.",
      fullDesc: "An epic underwater adventure revealing the extraordinary diversity of marine life and the fragile beauty of our ocean ecosystems. Witness behaviors never before captured on camera.",
      awards: 3,
      link: "https://www.netflix.com",
    },
    {
      id: 6,
      title: "The Social Dilemma",
      image: "/movie2.jpg",
      category: "Science",
      year: "2022",
      duration: "1 Film",
      rating: 4.5,
      desc: "Technology's impact on society.",
      fullDesc: "Former tech insiders reveal how social media platforms manipulate users and impact society. A eye-opening look at the dangerous human impact of social networking.",
      awards: 1,
      link: "https://www.netflix.com",
    },
    {
      id: 7,
      title: "Free Solo",
      image: "/movie.jpg",
      category: "Biography",
      year: "2018",
      duration: "1 Film",
      rating: 5.0,
      desc: "Climbing El Capitan without ropes.",
      fullDesc: "Follow rock climber Alex Honnold as he prepares to achieve his lifelong dream: scaling the 3,000-foot El Capitan in Yosemite without a rope. A breathtaking test of human limits.",
      awards: 7,
      link: "https://www.netflix.com",
    },
    {
      id: 8,
      title: "Our Planet",
      image: "/movie1.jpg",
      category: "Nature",
      year: "2023",
      duration: "8 Episodes",
      rating: 4.9,
      desc: "Climate change and wildlife conservation.",
      fullDesc: "Experience our planet's natural beauty and witness how climate change impacts all living creatures. A powerful call to action for environmental conservation.",
      awards: 4,
      link: "https://www.netflix.com",
    },
    {
      id: 9,
      title: "The Universe",
      image: "/movie2.jpg",
      category: "Science",
      year: "2023",
      duration: "12 Episodes",
      rating: 4.7,
      desc: "Exploring galaxies and cosmic phenomena.",
      fullDesc: "Venture into deep space to explore galaxies, black holes, and cosmic phenomena. This series unravels the mysteries of the universe with cutting-edge science and stunning visualizations.",
      awards: 2,
      link: "https://www.netflix.com",
    },
    {
      id: 10,
      title: "Medieval History",
      image: "/movie.jpg",
      category: "History",
      year: "2022",
      duration: "8 Episodes",
      rating: 4.5,
      desc: "Knights, castles, and medieval warfare.",
      fullDesc: "Journey through the Middle Ages to discover the world of knights, castles, battles, and the people who shaped medieval Europe. An immersive historical experience.",
      awards: 1,
      link: "https://www.netflix.com",
    },
    {
      id: 11,
      title: "13th",
      image: "/movie1.jpg",
      category: "History",
      year: "2016",
      duration: "1 Film",
      rating: 4.8,
      desc: "Race and the U.S. criminal justice system.",
      fullDesc: "An in-depth look at the prison system in the United States and how it reveals the nation's history of racial inequality. A powerful and essential documentary.",
      awards: 6,
      link: "https://www.netflix.com",
    },
    {
      id: 12,
      title: "Wonders of the Solar System",
      image: "/movie2.jpg",
      category: "Science",
      year: "2021",
      duration: "5 Episodes",
      rating: 4.8,
      desc: "Exploring planets and moons.",
      fullDesc: "Take a tour of our solar system and discover the wonders of our planetary neighborhood. From Mars to Saturn, explore the incredible diversity of worlds around us.",
      awards: 3,
      link: "https://www.netflix.com",
    },
  ];

  const filteredDocs =
    activeCategory === "All"
      ? documentaries
      : documentaries.filter((doc) => doc.category === activeCategory);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-emerald-950/20 to-black px-3 sm:px-4 pb-12 sm:pb-16 pt-20 sm:pt-24 lg:px-8">
      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute left-20 top-40 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute right-20 top-60 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl"
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
          <div className="mb-4 sm:mb-6 flex items-center gap-3">
            <Film className="text-emerald-400" size={32} />
            <h1 className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent">
              Documentaries
            </h1>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-gray-400">
            Award-winning documentaries and educational content
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10 flex flex-wrap gap-3"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-6 py-2 font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Documentaries Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredDocs.map((doc, index) => (
            <motion.div
              key={doc.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/70 to-emerald-950/40 shadow-2xl ring-1 ring-white/10 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-emerald-500/30 hover:ring-emerald-500/50">
                {/* Awards Badge */}
                {doc.awards > 0 && (
                  <div className="absolute right-4 top-4 z-20 flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
                    <Award size={12} />
                    {doc.awards} Awards
                  </div>
                )}

                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={doc.image}
                    alt={doc.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />

                  {/* Category Tag */}
                  <div className="absolute left-4 top-4 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                    {doc.category}
                  </div>

                  {/* Play Overlay */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <div className="rounded-full bg-emerald-500/30 p-6 backdrop-blur-md ring-2 ring-emerald-400/60">
                      <Play className="text-white" size={32} fill="white" />
                    </div>
                  </motion.div>

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="mb-2 text-xl font-bold text-white drop-shadow-lg">
                      {doc.title}
                    </h3>

                    <div className="mb-3 flex items-center gap-4 text-xs text-gray-300">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {doc.year}
                      </div>
                      <div className="flex items-center gap-1">
                        <Film size={14} />
                        {doc.duration}
                      </div>
                    </div>

                    <p className="text-sm text-gray-300 line-clamp-2">
                      {doc.desc}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 p-4">
                  <button
                    onClick={() => setSelectedDoc(doc)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 font-semibold text-white shadow-lg transition-all hover:from-emerald-500 hover:to-teal-500 hover:shadow-emerald-500/50"
                  >
                    <Play size={18} fill="white" />
                    Watch Now
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleWatchlist(doc)}
                    className={`rounded-lg px-4 py-3 shadow-lg transition-all ${
                      watchlist.some((item) => item.id === doc.id)
                        ? "bg-cyan-500 text-white"
                        : "bg-white/10 text-gray-300 hover:bg-white/20"
                    }`}
                  >
                    <Bookmark
                      size={20}
                      fill={watchlist.some((item) => item.id === doc.id) ? "white" : "none"}
                    />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleFavorites(doc)}
                    className={`rounded-lg px-4 py-3 shadow-lg transition-all ${
                      favorites.some((item) => item.id === doc.id)
                        ? "bg-pink-500 text-white"
                        : "bg-white/10 text-gray-300 hover:bg-white/20"
                    }`}
                  >
                    <Heart
                      size={20}
                      fill={favorites.some((item) => item.id === doc.id) ? "white" : "none"}
                    />
                  </motion.button>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-cyan-500/30 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Watch Modal */}
      <AnimatePresence>
        {selectedDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDoc(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-emerald-950 shadow-2xl ring-2 ring-emerald-500/50"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedDoc(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70 hover:scale-110"
              >
                <X size={24} />
              </button>

              {/* Image Header */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={selectedDoc.image}
                  alt={selectedDoc.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />
                
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="mb-2 text-3xl font-black text-white drop-shadow-lg">
                    {selectedDoc.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-gray-200">
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-400" size={16} fill="#facc15" />
                      <span className="font-bold">{selectedDoc.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      {selectedDoc.year}
                    </div>
                    <div className="flex items-center gap-1">
                      <Film size={16} />
                      {selectedDoc.duration}
                    </div>
                    {selectedDoc.awards > 0 && (
                      <div className="flex items-center gap-1 rounded-full bg-amber-500/90 px-2 py-0.5 text-xs font-bold">
                        <Award size={12} />
                        {selectedDoc.awards} Awards
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-2 inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-semibold text-emerald-400">
                  {selectedDoc.category}
                </div>
                <p className="mb-6 text-gray-300 leading-relaxed">
                  {selectedDoc.fullDesc}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a
                    href={selectedDoc.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 font-bold text-white shadow-lg transition-all hover:from-emerald-500 hover:to-teal-500 hover:shadow-emerald-500/50"
                  >
                    <Play size={20} fill="white" />
                    Watch Documentary
                  </a>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleWatchlist(selectedDoc)}
                    className={`rounded-xl px-6 py-4 font-bold shadow-lg transition-all ${
                      watchlist.some((item) => item.id === selectedDoc.id)
                        ? "bg-cyan-500 text-white"
                        : "bg-white/10 text-gray-300 hover:bg-white/20"
                    }`}
                  >
                    <Bookmark
                      size={24}
                      fill={watchlist.some((item) => item.id === selectedDoc.id) ? "white" : "none"}
                    />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleFavorites(selectedDoc)}
                    className={`rounded-xl px-6 py-4 font-bold shadow-lg transition-all ${
                      favorites.some((item) => item.id === selectedDoc.id)
                        ? "bg-pink-500 text-white"
                        : "bg-white/10 text-gray-300 hover:bg-white/20"
                    }`}
                  >
                    <Heart
                      size={24}
                      fill={favorites.some((item) => item.id === selectedDoc.id) ? "white" : "none"}
                    />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
