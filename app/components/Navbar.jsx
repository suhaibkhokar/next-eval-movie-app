"use client";

import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Menu, X, Sparkles, Bookmark, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    let lastScrollY = 0;

    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScrollY && current > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setScrolled(current > 50);
      lastScrollY = current;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleGoogleLogin = async () => {
    if (loading) return;

    const provider = new GoogleAuthProvider();

    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error.code);

      if (error.code === "auth/popup-blocked") {
        alert("Popup blocked! Please allow popups in browser.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim()) {
      router.push(`/search?query=${query}`);
      setShowSearch(false);
      setQuery("");
    }
  };

  const navItems = [
    { name: "Movies", path: "/", icon: "🎬" },
    { name: "TV Shows", path: "/tvshows", icon: "📺" },
    { name: "Documentaries", path: "/docs", icon: "🎥" },
  ];

  return (
    <>
      {/* Animated background blobs */}
      <div className="pointer-events-none fixed left-0 top-0 z-40 h-32 w-full overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-20 -top-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 30, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-20 -top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl"
        />
      </div>

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: visible ? 0 : -120,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed z-50 w-full border-b text-white transition-all duration-500 ${
          scrolled
            ? "border-cyan-500/30 bg-black/90 shadow-[0_8px_32px_0_rgba(6,182,212,0.1)] backdrop-blur-2xl"
            : "border-white/5 bg-gradient-to-b from-black/40 to-transparent backdrop-blur-xl"
        }`}
      >
        {/* Animated top border glow */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scaleX: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
        />

        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* LEFT - Nav Items */}
          <div className="hidden gap-8 md:flex">
            {navItems.map((item, i) => (
              <motion.div
                key={i}
                onHoverStart={() => setHoveredItem(item.name)}
                onHoverEnd={() => setHoveredItem(null)}
                whileHover={{ y: -2 }}
                className="relative"
              >
                <Link
                  href={item.path}
                  className="group flex items-center gap-2 text-sm font-medium transition-colors hover:text-cyan-400"
                >
                  <motion.span
                    animate={hoveredItem === item.name ? { rotate: 360, scale: 1.2 } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.span>
                  <span>{item.name}</span>
                  
                  {/* Animated underline */}
                  <motion.span
                    className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: hoveredItem === item.name ? "100%" : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Glow effect */}
                  {hoveredItem === item.name && (
                    <motion.span
                      layoutId="navGlow"
                      className="absolute -inset-2 -z-10 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* MOBILE MENU */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* LOGO - Center */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 hidden md:block">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(6,182,212,0.3)",
                    "0 0 40px rgba(6,182,212,0.6)",
                    "0 0 20px rgba(6,182,212,0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="rounded-lg px-3 py-1"
              >
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-lg font-black tracking-widest text-transparent">
                  FOCUSREEL
                </span>
              </motion.div>
              
              {/* Floating sparkle */}
              <motion.div
                animate={{
                  y: [-5, 5, -5],
                  rotate: [0, 180, 360],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -right-2 -top-2"
              >
                <Sparkles size={16} className="text-cyan-400" />
              </motion.div>
            </motion.div>
          </Link>

          {/* Mobile Logo */}
          <Link href="/" className="md:hidden">
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-base font-black tracking-widest text-transparent">
                FOCUSREEL
              </span>
            </motion.div>
          </Link>

          {/* RIGHT - Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSearch(!showSearch)}
                className="relative"
              >
                <Search size={18} className={showSearch ? "text-cyan-400" : ""} />
                {showSearch && (
                  <motion.span
                    className="absolute inset-0 -z-10 rounded-full bg-cyan-500/20 blur-lg"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.button>

              <AnimatePresence>
                {showSearch && (
                  <motion.input
                    initial={{ width: 0, opacity: 0, x: -20 }}
                    animate={{ width: window.innerWidth < 640 ? 120 : 160, opacity: 1, x: 0 }}
                    exit={{ width: 0, opacity: 0, x: -20 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    className="rounded-full border border-cyan-500/30 bg-black/60 px-3 sm:px-4 py-1.5 text-xs sm:text-sm text-white placeholder-gray-400 outline-none ring-2 ring-cyan-500/20 backdrop-blur-xl transition-all focus:border-cyan-500/50 focus:ring-cyan-500/40"
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Auth Section */}
            <div className="hidden items-center gap-3 text-sm md:flex">
              {!user ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="group relative overflow-hidden rounded-full bg-white px-5 py-2 font-semibold text-black transition-all disabled:opacity-50"
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10 group-hover:text-white">
                      {loading ? "Loading..." : "🚀 Login"}
                    </span>
                  </motion.button>

                  <Link href="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-5 py-2 font-semibold shadow-lg shadow-cyan-500/30 transition-all"
                    >
                      <motion.span
                        animate={{
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-[length:200%_100%]"
                      />
                      <span className="relative z-10">✨ Sign Up</span>
                    </motion.button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/watchlist">
                    <motion.div
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="group relative"
                    >
                      <Bookmark size={18} className="transition-colors group-hover:text-cyan-400" />
                      <motion.span
                        className="absolute -inset-2 -z-10 rounded-full bg-cyan-500/0 blur-lg transition-all group-hover:bg-cyan-500/30"
                      />
                    </motion.div>
                  </Link>
                  
                  <Link href="/favorites">
                    <motion.div
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="group relative"
                    >
                      <Heart size={18} className="transition-colors group-hover:text-red-400" />
                      <motion.span
                        className="absolute -inset-2 -z-10 rounded-full bg-red-500/0 blur-lg transition-all group-hover:bg-red-500/30"
                      />
                    </motion.div>
                  </Link>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="rounded-full bg-gradient-to-r from-red-500 to-pink-600 px-4 py-1.5 font-medium shadow-lg shadow-red-500/30 transition-all hover:shadow-red-500/50"
                  >
                    Logout
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-cyan-500/20 bg-black/95 backdrop-blur-xl md:hidden"
            >
              <div className="space-y-4 px-6 py-6">
                {navItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={item.path}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 text-lg font-medium transition-colors hover:text-cyan-400"
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
                
                {user && (
                  <>
                    <div className="border-t border-cyan-500/20 pt-4">
                      <Link href="/watchlist" onClick={() => setMenuOpen(false)}>
                        <div className="flex items-center gap-3 py-2 text-lg">
                          <Bookmark size={20} />
                          <span>Watchlist</span>
                        </div>
                      </Link>
                      <Link href="/favorites" onClick={() => setMenuOpen(false)}>
                        <div className="flex items-center gap-3 py-2 text-lg">
                          <Heart size={20} />
                          <span>Favorites</span>
                        </div>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}