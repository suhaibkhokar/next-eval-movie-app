"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { motion } from "framer-motion";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [userEmail, setUserEmail] = useState("");

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
          className="w-full p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg"
        >
          Signup
        </motion.button>

        <p className="text-center text-gray-300 text-sm mt-4">
          Welcome to your movie app 🎬
        </p>
      </motion.form>
    </div>
  );
}