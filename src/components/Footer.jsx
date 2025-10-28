import React from "react";
import { motion } from "framer-motion";
import "@fontsource/poppins/500.css";
import "@fontsource/orbitron/700.css";

export default function Footer() {
  return (
    <footer className="bg-[#0A0F24] text-[#E5E5E5] border-t border-[#1F2A44] py-10 font-[Poppins] select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto flex flex-col items-center gap-6"
      >
      
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          <a
            href="mailto:hammad.azeem2121@gmail.com"
            className="hover:scale-110 transition-transform duration-300"
            title="Email"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
              alt="Email"
              className="w-7 h-7 opacity-90 hover:opacity-100"
            />
          </a>

          <a
            href="https://www.linkedin.com/in/hammad-azeem-61495a215"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-300"
            title="LinkedIn"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              alt="LinkedIn"
              className="w-7 h-7 opacity-90 hover:opacity-100"
            />
          </a>

          <a
            href="https://wa.me/923350502307"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-300"
            title="WhatsApp"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
              alt="WhatsApp"
              className="w-7 h-7 opacity-90 hover:opacity-100"
            />
          </a>

          <a
            href="https://github.com/Hammad2323"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-300"
            title="GitHub"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="GitHub"
              className="w-7 h-7 opacity-90 hover:opacity-100"
            />
          </a>

          <a
            href="https://www.instagram.com/hhammad23"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-300"
            title="Instagram"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
              alt="Instagram"
              className="w-7 h-7 opacity-90 hover:opacity-100"
            />
          </a>
        </div>

        
        <div className="w-24 h-[2px] bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] rounded-full mt-4"></div>

        
        <p className="text-xs sm:text-sm text-gray-400 mt-3 text-center">
          © {new Date().getFullYear()} All Rights Reserved.
        </p>
      </motion.div>
    </footer>
  );
}
