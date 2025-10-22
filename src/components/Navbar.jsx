import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="bg-gradient-to-r from-orange-100 to-orange-200 shadow-md font-[Poppins] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* === Logo / Name === */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-extrabold text-orange-600"
        >
          <Link to="/">MyPortfolio</Link>
        </motion.div>

        {/* === Desktop Nav === */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `transition-all duration-300 hover:text-orange-600 ${
                  isActive ? "text-orange-600 font-semibold" : ""
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          <Link
            to="/admin"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300"
          >
            Admin
          </Link>
        </nav>

        {/* === Mobile Menu Button === */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-orange-600"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* === Mobile Dropdown === */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white shadow-inner py-4 flex flex-col items-center gap-4"
        >
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `transition-all duration-300 hover:text-orange-600 ${
                  isActive ? "text-orange-600 font-semibold" : "text-gray-700"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          <Link
            to="/admin"
            onClick={() => setOpen(false)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300"
          >
            Admin
          </Link>
        </motion.div>
      )}
    </header>
  );
}
