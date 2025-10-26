import React from "react";
import { motion } from "framer-motion";
import heroImage from "../assets/hero.png"; 
import "@fontsource/poppins/500.css";
import "@fontsource/orbitron/700.css";

export default function Home() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0A0F24] to-[#1A2238] flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-16 pt-24 md:pt-32 font-[Poppins]">
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="text-center md:text-left md:w-1/2 space-y-6 mt-10 md:mt-0"
      >
        <h1 className="text-4xl md:text-6xl font-[Orbitron] font-bold leading-tight text-[#F8F8F8]">
          Hi, I’m{" "}
          <span className="text-[#8B5CF6] drop-shadow-sm">Hammad Azeem</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-[#B3B3B3]">
          Frontend Developer & UI/UX Enthusiast
        </h2>

        <p className="text-[#C7C7C7] text-base md:text-lg max-w-md mx-auto md:mx-0 leading-relaxed">
          I design and develop elegant, high-performance websites that merge
          creativity with seamless user experiences. My goal is to make every
          project not just functional — but visually inspiring.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
          <motion.a
            href="/projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#38BDF8] text-[#0A0F24] font-semibold shadow-md hover:shadow-[#8B5CF6]/40 transition-all duration-300"
          >
            View My Work
          </motion.a>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full border border-[#38BDF8] text-[#38BDF8] font-semibold hover:bg-[#38BDF8]/10 transition-all duration-300"
          >
            Contact Me
          </motion.a>
        </div>
      </motion.div>

      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="flex justify-center md:justify-end md:w-1/2"
      >
        <img
          src={heroImage}
          alt="Hammad Azeem"
          className="w-64 sm:w-80 md:w-[440px] object-cover select-none"
          style={{
            border: "none",
            outline: "none",
            boxShadow: "none",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 90%, rgba(0,0,0,0))",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 90%, rgba(0,0,0,0))",
          }}
        />
      </motion.div>
    </section>
  );
}
