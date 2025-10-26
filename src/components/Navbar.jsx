import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import "@fontsource/orbitron/700.css";
import "@fontsource/poppins/500.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-[#050A1F] sticky top-0 z-50 shadow-md border-b border-[#1A1F35]">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
      
        <motion.div whileHover={{ scale: 1.03 }} className="select-none">
          <Link
            to="/"
            className="text-3xl font-[Orbitron] tracking-widest bg-gradient-to-r from-[#8B5CF6] to-[#38BDF8] text-transparent bg-clip-text"
          >
            H@ Vision
          </Link>
          <p className="text-[#B3B3B3] text-sm tracking-wider mt-1 font-[Poppins]">
            Where Creativity Meets Code.
          </p>
        </motion.div>

      
        <nav className="hidden md:flex space-x-8 text-[#F8F8F8] font-[Poppins] font-medium">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`relative group transition ${
                location.pathname === to ? "text-[#38BDF8]" : "hover:text-[#38BDF8]"
              }`}
            >
              {label}
              <span
                className={`absolute left-0 bottom-1 h-0.5 bg-[#38BDF8] transition-all duration-300 ${
                  location.pathname === to ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </nav>

        
        <button
          className="md:hidden text-[#F8F8F8] hover:text-[#38BDF8] transition"
          onClick={() => setIsOpen((s) => !s)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#050A1F] text-center py-4 space-y-4 border-t border-[#151B2E]"
        >
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={`block text-lg ${
                location.pathname === to ? "text-[#38BDF8]" : "text-[#F8F8F8] hover:text-[#38BDF8]"
              }`}
            >
              {label}
            </Link>
          ))}
        </motion.nav>
      )}
    </header>
  );
}
