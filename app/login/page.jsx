"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("Logged in:", userCredential.user);

      alert("Login Successful ✅");

      // optional redirect
      window.location.href = "/";
    } catch (error) {
      console.log("Firebase Error:", error.code);

      // 🔥 CLEAN ERROR MESSAGES
      let message = "Login failed";

      if (error.code === "auth/user-not-found") {
        message = "User not found";
      } else if (error.code === "auth/wrong-password") {
        message = "Wrong password";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email format";
      } else {
        message = error.message;
      }

      alert(message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-4">

      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-xl border border-gray-700 p-8 rounded-2xl shadow-2xl">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-2 text-red-500">
          Welcome Back
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Login to continue watching movies
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email address"
            className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:outline-none focus:border-red-500"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:outline-none focus:border-red-500"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 transition py-3 rounded-lg font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Don’t have an account? <span className="text-red-500">Sign up</span>
        </p>

      </div>
    </div>
  );
}