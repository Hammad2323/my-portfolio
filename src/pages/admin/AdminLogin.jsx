import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
      setError("Incorrect password! Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center"
      >
        <h2 className="text-3xl font-bold text-orange-500 mb-6">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-md mb-4 focus:ring-2 focus:ring-orange-400"
            required
          />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold w-full transition duration-200"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
}
