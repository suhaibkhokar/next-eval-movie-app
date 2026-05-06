"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../lib/firebase";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'error' or 'success'
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUserEmail(userCredential.user.email);
      setMessage("Login successful! Redirecting...");
      setMessageType("success");
      setTimeout(() => {
        window.location.href = "/";
      }, 1200);
    } catch (error) {
      console.error("Login error:", error);
      let msg = "Login failed. Please try again.";
      if (error.code === "auth/user-not-found") msg = "No account found with this email.";
      else if (error.code === "auth/wrong-password") msg = "Incorrect password. Please try again.";
      else if (error.code === "auth/invalid-email") msg = "Please enter a valid email address.";
      setMessage(msg);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setMessage("");
    setMessageType("");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUserEmail(result.user.email);
      setMessage("Login successful! Redirecting...");
      setMessageType("success");
      setTimeout(() => {
        window.location.href = "/";
      }, 1200);
    } catch (error) {
      setMessage("Google login failed. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-900 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-30 animate-pulse top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-20 animate-ping bottom-10 right-10"></div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-[350px] p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl relative"
      >
        {/* Animated error/success message and user email */}
        <AnimatePresence>
          {message && (
            <motion.div
              key={message}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className={`mb-2 px-4 py-2 rounded-lg text-center font-medium shadow-lg ${
                messageType === "error"
                  ? "bg-red-500/80 text-white border border-red-300"
                  : "bg-green-500/80 text-white border border-green-300"
              }`}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {userEmail && messageType === "success" && (
            <motion.div
              key={userEmail}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="mb-4 px-4 py-2 rounded-lg text-center font-semibold bg-white/80 text-purple-700 border border-purple-300 shadow-lg"
            >
              {userEmail}
            </motion.div>
          )}
        </AnimatePresence>

        <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>

        <form onSubmit={handleLogin}>
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg bg-white/10 text-white placeholder-gray-300 outline-none border border-white/20"
            autoComplete="email"
            required
          />
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-6 rounded-lg bg-white/10 text-white placeholder-gray-300 outline-none border border-white/20"
            autoComplete="current-password"
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "login in..." : "login In"}
          </motion.button>
        </form>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full mt-4 p-3 rounded-lg bg-white/80 text-gray-800 font-semibold shadow-lg flex items-center justify-center gap-2 hover:bg-white/90 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <svg width="22" height="22" viewBox="0 0 48 48" className="inline-block align-middle mr-2"><g><path fill="#4285F4" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.3-5.7 7-11.3 7-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2 0.9 7.2 2.4l6-6C36.1 5.1 30.4 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-0.1-2.2-0.3-3.5z"/><path fill="#34A853" d="M6.3 14.7l6.6 4.8C14.3 16.1 18.7 13 24 13c2.7 0 5.2 0.9 7.2 2.4l6-6C36.1 5.1 30.4 3 24 3 15.3 3 7.6 8.6 6.3 14.7z"/><path fill="#FBBC05" d="M24 43c5.4 0 10.1-1.8 13.5-4.8l-6.2-5.1C29.7 34.6 27 35.5 24 35.5c-5.5 0-10.1-3.7-11.7-8.7l-6.6 5.1C7.6 39.4 15.3 45 24 45z"/><path fill="#EA4335" d="M43.6 20.5h-1.9V20H24v8h11.3c-0.7 2.1-2.1 3.9-4.1 5.1l6.2 5.1C41.9 36.7 44 30.6 44 24c0-1.3-0.1-2.2-0.4-3.5z"/></g></svg>
          Continue with Google
        </button>

        <p className="text-center text-gray-300 text-sm mt-4">
          Welcome back to your movie app 🎬
        </p>
      </motion.div>
    </div>
  );
}