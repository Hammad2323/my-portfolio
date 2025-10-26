import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, Linkedin, Github, Instagram } from "lucide-react";

export default function Footer() {
  const email = "hajnjpk2121@gmail.com";
  const whatsappNumber = "923350502307";
  const linkedinUrl = "https://www.linkedin.com/in/hammad-azeem-61495a215";
  const githubUrl = "https://github.com/Hammad2323";
  const instagramUrl = "https://www.instagram.com/hhammad23";

  const [toast, setToast] = useState("");

  const handleClick = (message, link) => {
    setToast(message);
    window.open(link, "_blank", "noopener,noreferrer");

    setTimeout(() => {
      setToast("");
    }, 2000);
  };

  return (
    <footer className="relative bg-[#050A1F] border-t border-[#1A1F35] py-10 text-center font-[Poppins] overflow-hidden">
  
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#8B5CF6] to-[#38BDF8] text-[#0A0F24] px-6 py-3 rounded-full shadow-lg font-semibold text-sm"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      
      <div className="flex justify-center gap-8 mb-6 flex-wrap">
        {[
          { icon: Mail, link: `mailto:${email}`, msg: "Opening Email..." },
          { icon: MessageCircle, link: `https://wa.me/${whatsappNumber}`, msg: "Opening WhatsApp..." },
          { icon: Linkedin, link: linkedinUrl, msg: "Opening LinkedIn..." },
          { icon: Github, link: githubUrl, msg: "Opening GitHub..." },
          { icon: Instagram, link: instagramUrl, msg: "Opening Instagram..." },
        ].map((item, i) => (
          <motion.button
            key={i}
            onClick={() => handleClick(item.msg, item.link)}
            className="p-4 rounded-full bg-[#0E1530] hover:bg-[#1A234A] transition-all duration-300"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <item.icon className="w-6 h-6 text-[#38BDF8]" />
          </motion.button>
        ))}
      </div>

      <div className="w-24 h-[2px] mx-auto bg-gradient-to-r from-[#8B5CF6] to-[#38BDF8] mb-4"></div>

      <p className="text-[#B3B3B3] text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-[#38BDF8]">Hammad Azeem</span>. All Rights Reserved.
      </p>
    </footer>
  );
}
