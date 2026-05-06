"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../lib/firebase";
import { motion } from "framer-motion";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleGoogleSignup = async () => {
    setLoading(true);
    setMessage("");
    setMessageType("");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUserEmail(result.user.email);
      setMessage("Signup successful! Redirecting...");
      setMessageType("success");
      setTimeout(() => {
        window.location.href = "/";
      }, 1200);
    } catch (error) {
      setMessage("Google signup failed. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUserEmail(userCredential.user.email);
      setMessage("Signup successful! Redirecting...");
      setMessageType("success");
      setTimeout(() => {
        window.location.href = "/";
      }, 1200);
    } catch (error) {
      let msg = "Signup failed. Please try again.";
      if (error.code === "auth/email-already-in-use") msg = "This email is already registered.";
      else if (error.code === "auth/invalid-email") msg = "Please enter a valid email address.";
      else if (error.code === "auth/weak-password") msg = "Password should be at least 6 characters.";
      setMessage(msg);
      setMessageType("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-900 relative overflow-hidden">

      {/* Animated background blobs */}
      <div className="absolute w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-30 animate-pulse top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-20 animate-ping bottom-10 right-10"></div>

      {/* Card */}
      <motion.form
        onSubmit={handleSignup}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-[350px] p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
      >
        {/* Animated error/success message and user email */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
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
        </motion.div>
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account
        </h2>

        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-white/10 text-white placeholder-gray-300 outline-none border border-white/20"
        />

        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg bg-white/10 text-white placeholder-gray-300 outline-none border border-white/20"
        />


        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg mb-3"
          disabled={loading}
        >
          {loading ? "Loading..." : "Signup"}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleGoogleSignup}
          className="w-full p-3 rounded-lg bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold shadow-lg flex items-center justify-center gap-2 mb-2"
          disabled={loading}
        >
          <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_17_40)"><path d="M47.5 24.552C47.5 22.864 47.345 21.232 47.06 19.667H24V28.334H37.19C36.62 31.134 34.89 33.434 32.36 34.934V40.184H40.16C44.36 36.334 47.5 31.034 47.5 24.552Z" fill="#4285F4"/><path d="M24 48C30.48 48 35.98 45.864 40.16 40.184L32.36 34.934C30.18 36.334 27.36 37.134 24 37.134C17.76 37.134 12.36 32.934 10.48 27.334H2.46V32.734C6.62 40.134 14.64 48 24 48Z" fill="#34A853"/><path d="M10.48 27.334C9.98 25.934 9.68 24.434 9.68 22.867C9.68 21.3 9.98 19.8 10.48 18.4V13H2.46C0.88 16.3 0 19.967 0 23.867C0 27.767 0.88 31.434 2.46 34.734L10.48 27.334Z" fill="#FBBC05"/><path d="M24 9.867C27.36 9.867 30.18 11.034 32.36 12.934L40.16 6.134C35.98 2.134 30.48 0 24 0C14.64 0 6.62 7.866 2.46 15.267L10.48 22.667C12.36 17.067 17.76 9.867 24 9.867Z" fill="#EA4335"/></g><defs><clipPath id="clip0_17_40"><rect width="48" height="48" fill="white"/></clipPath></defs></svg>
          Continue with Google
        </motion.button>

        <p className="text-center text-gray-300 text-sm mt-4">
          Welcome to your movie app 🎬
        </p>
      </motion.form>
    </div>
  );
}