import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "@fontsource/poppins/500.css";
import "@fontsource/orbitron/700.css";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminAuth") === "true";
    if (isLoggedIn) navigate("/admin");
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin");
    } else {
      setError("❌ Incorrect password! Try again.");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0A0F24] to-[#1A2238] flex items-center justify-center font-[Poppins] text-[#E5E5E5]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-[#111827]/70 backdrop-blur-xl shadow-2xl rounded-2xl p-10 w-full max-w-md text-center border border-[#2D3C5A]"
      >
        <h2 className="text-4xl font-[Orbitron] text-[#C9A7FF] mb-8">
          Admin Login
        </h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#0F172A] border border-[#334155] text-white p-3 rounded-lg mb-4 focus:ring-2 focus:ring-[#8B5CF6]"
            required
          />
          {error && (
            <p className="text-red-400 text-sm font-medium mb-4">{error}</p>
          )}
          <button
            type="submit"
            className="bg-gradient-to-r from-[#8B5CF6] to-[#38BDF8] hover:opacity-90 text-white px-8 py-3 rounded-xl font-semibold w-full transition-all duration-300 shadow-lg"
          >
            Login
          </button>
        </form>
      </motion.div>
    </section>
  );
}
