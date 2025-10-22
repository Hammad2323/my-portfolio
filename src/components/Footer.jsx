import React from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Linkedin, Github, Instagram } from "lucide-react";

export default function Footer() {
  // 🔹 Replace these with your actual contact info
  const email = "youremail@example.com";
  const whatsappNumber = "923001234567";
  const linkedinUrl = "https://www.linkedin.com/in/yourprofile";
  const githubUrl = "https://github.com/yourusername";
  const instagramUrl = "https://www.instagram.com/yourusername";

  return (
    <footer className="bg-gradient-to-r from-orange-50 to-orange-100 py-10 text-center font-[Poppins] border-t border-orange-200">
      {/* === Social Links === */}
      <div className="flex justify-center gap-8 mb-6 flex-wrap">
        {[
          { icon: Mail, link: `mailto:${email}`, color: "bg-orange-100", hover: "hover:bg-orange-200" },
          { icon: MessageCircle, link: `https://wa.me/${whatsappNumber}`, color: "bg-green-100", hover: "hover:bg-green-200" },
          { icon: Linkedin, link: linkedinUrl, color: "bg-blue-100", hover: "hover:bg-blue-200" },
          { icon: Github, link: githubUrl, color: "bg-gray-100", hover: "hover:bg-gray-200" },
          { icon: Instagram, link: instagramUrl, color: "bg-pink-100", hover: "hover:bg-pink-200" },
        ].map((item, i) => (
          <motion.a
            key={i}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${item.color} ${item.hover} p-4 rounded-full shadow-md transition-all duration-300`}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <item.icon className="w-6 h-6 text-orange-500" />
          </motion.a>
        ))}
      </div>

      {/* === Divider Line === */}
      <div className="w-24 h-[2px] bg-orange-300 mx-auto mb-4"></div>

      {/* === Copyright === */}
      <p className="text-gray-700 text-sm">
        © {new Date().getFullYear()} <span className="font-semibold text-orange-500">Your Name</span>. All Rights Reserved.
      </p>
    </footer>
  );
}
