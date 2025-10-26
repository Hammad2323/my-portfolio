import React from "react";
import { motion } from "framer-motion";
import "@fontsource/poppins/500.css";
import "@fontsource/orbitron/700.css";

export default function About() {
  return (
    <motion.section
      className="min-h-screen bg-gradient-to-b from-[#0A0F24] to-[#1A2238] text-[#E5E5E5] py-20 px-6 md:px-16 font-[Poppins]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-center text-4xl md:text-5xl font-[Orbitron] mb-10 text-[#C9A7FF]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        About <span className="text-[#38BDF8]">Me</span>
      </motion.h1>

      <motion.div
        className="max-w-5xl mx-auto text-center leading-relaxed text-[#C7C7C7] space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-lg">
          I’m a passionate developer focused on crafting beautiful, functional, and
          customer-centered digital experiences. My goal is to design projects that
          not only look great but also deliver real results and connect emotionally
          with users.
        </p>

        <p className="text-lg">
          With expertise in modern web technologies like{" "}
          <span className="text-[#8B5CF6] font-semibold">React</span>,{" "}
          <span className="text-[#38BDF8] font-semibold">Firebase</span>, and{" "}
          <span className="text-[#C9A7FF] font-semibold">Tailwind CSS</span>, I
          bring creative ideas to life with precision and detail. Every component,
          every page, and every interaction is thoughtfully designed.
        </p>

        <p className="text-lg">
          Beyond coding, I believe in aesthetics, storytelling, and creating digital
          experiences that leave a lasting impression.
        </p>
      </motion.div>

      <motion.div
        className="mt-16 flex flex-col md:flex-row items-center justify-center gap-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="p-6 rounded-2xl bg-[#11162C]/60 border border-[#2A3558] shadow-lg max-w-sm text-center hover:shadow-[#8B5CF6]/30 transition-all duration-500">
          <h3 className="text-[#8B5CF6] text-xl font-[Orbitron] mb-2">
            Vision
          </h3>
          <p className="text-[#C7C7C7] text-sm">
            To design creative digital spaces that merge art and technology.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#11162C]/60 border border-[#2A3558] shadow-lg max-w-sm text-center hover:shadow-[#38BDF8]/30 transition-all duration-500">
          <h3 className="text-[#38BDF8] text-xl font-[Orbitron] mb-2">
            Mission
          </h3>
          <p className="text-[#C7C7C7] text-sm">
            Deliver user-centered experiences with elegance, clarity, and purpose.
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
}
