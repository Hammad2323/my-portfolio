import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Globe } from "lucide-react";
import heroImage from "../assets/hero.png"; // 🔹 Add your image in /src/assets folder

export default function Home() {
  return (
    <section className="bg-gradient-to-b from-orange-50 to-white min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-16">
      {/* === Left Content === */}
      <motion.div
        className="flex-1 text-center md:text-left"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-4">
          Hi, I’m{" "}
          <span className="text-orange-500 drop-shadow-md">Hammad Azeem</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 mb-6">
          Frontend Developer & UI/UX Enthusiast
        </h2>
        <p className="text-gray-700 text-lg mb-8 max-w-xl">
          I build modern, responsive, and visually stunning web experiences that
          bring ideas to life. Passionate about React, Tailwind, and seamless
          user interactions.
        </p>

        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          <motion.a
            href="/projects"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            View My Work <ArrowRight size={18} />
          </motion.a>
          <motion.a
            href="/contact"
            className="border-2 border-orange-500 text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition"
            whileHover={{ scale: 1.05 }}
          >
            Contact Me
          </motion.a>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-start gap-6 mt-8">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            <Github size={28} />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-700 transition"
          >
            <Linkedin size={28} />
          </a>
         
        </div>
      </motion.div>

      {/* === Right Side Image === */}
      <motion.div
        className="flex-1 flex justify-center mt-10 md:mt-0"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={heroImage}
          alt="Developer Illustration"
          className="w-72 md:w-96 drop-shadow-2xl rounded-2xl"
        />
      </motion.div>
    </section>
  );
}
