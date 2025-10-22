import React from "react";
import {
  Mail,
  MessageCircle,
  Linkedin,
  Github,
  Instagram,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  // 🔹 Replace with your real contact info
  const email = "youremail@example.com";
  const whatsappNumber = "923001234567";
  const linkedinUrl = "https://www.linkedin.com/in/yourprofile";
  const githubUrl = "https://github.com/yourusername";
  const instagramUrl = "https://www.instagram.com/yourusername";

  return (
    <section className="bg-gradient-to-b from-white to-orange-50 py-20 px-6 text-center font-[Poppins]">
      {/* === Title === */}
      <motion.h2
        className="text-4xl font-bold text-orange-500 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Let's Connect
      </motion.h2>

      <p className="text-gray-700 max-w-2xl mx-auto mb-12 text-lg">
        Whether you’d like to discuss a project, collaborate, or just say hello —
        reach out anytime via Email, WhatsApp, or my social profiles below.
      </p>

      {/* === Contact Buttons === */}
      <div className="flex justify-center gap-8 flex-wrap mb-16">
        {/* Email */}
        <motion.a
          href={`mailto:${email}`}
          className="flex items-center gap-3 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-orange-600 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Mail className="w-5 h-5" />
          Email Me
        </motion.a>

        {/* WhatsApp */}
        <motion.a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-green-600 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp Me
        </motion.a>
      </div>

      {/* === Social Icons with Card Style === */}
      <div className="flex justify-center gap-8 flex-wrap">
        {[
          { icon: Linkedin, link: linkedinUrl, color: "bg-blue-100", hover: "hover:bg-blue-200" },
          { icon: Github, link: githubUrl, color: "bg-gray-100", hover: "hover:bg-gray-200" },
          { icon: Instagram, link: instagramUrl, color: "bg-pink-100", hover: "hover:bg-pink-200" },
        ].map((item, i) => (
          <motion.a
            key={i}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${item.color} ${item.hover} p-6 rounded-full shadow-lg transition-all duration-300`}
            whileHover={{ scale: 1.15, rotate: 5 }}
          >
            <item.icon className="w-8 h-8 text-orange-500" />
          </motion.a>
        ))}
      </div>
    </section>
  );
}
