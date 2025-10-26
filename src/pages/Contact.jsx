import React from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Linkedin, Github, Instagram } from "lucide-react";

export default function Contact() {
  const email = "hajnjpk2121@gmail.com";
  const whatsappNumber = "9233350502307";
  const linkedinUrl = "https://www.linkedin.com/in/hammad-azeem-61495a215";
  const githubUrl = "https://github.com/Hammad2323";
  const instagramUrl = "https://www.instagram.com/hhammad23";

  const contacts = [
    { name: "Email", icon: Mail, link: `mailto:${email}`, color: "from-[#8B5CF6] to-[#38BDF8]" },
    { name: "WhatsApp", icon: MessageCircle, link: `https://wa.me/${whatsappNumber}`, color: "from-[#25D366] to-[#128C7E]" },
    { name: "LinkedIn", icon: Linkedin, link: linkedinUrl, color: "from-[#0077B5] to-[#00A0DC]" },
    { name: "GitHub", icon: Github, link: githubUrl, color: "from-[#8B5CF6] to-[#1A2238]" },
    { name: "Instagram", icon: Instagram, link: instagramUrl, color: "from-[#F56040] to-[#FCAF45]" },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0A0F24] to-[#1A2238] flex flex-col items-center justify-center px-6 pt-32 pb-20 font-[Poppins] text-center">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-[#F8F8F8] mb-6 font-[Orbitron]"
      >
        Let’s <span className="text-[#8B5CF6]">Connect</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-[#B3B3B3] text-lg max-w-xl mb-12"
      >
        Whether you have a question, a project idea, or just want to say hello — 
        feel free to reach out through any of the platforms below.
      </motion.p>

      <div className="flex flex-wrap justify-center gap-6">
        {contacts.map((item, i) => (
          <motion.a
            key={i}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r ${item.color} text-white font-medium shadow-lg hover:shadow-[#38BDF8]/40 transition-all duration-300`}
          >
            <item.icon className="w-6 h-6" />
            {item.name}
          </motion.a>
        ))}
      </div>

      <div className="w-24 h-[2px] mx-auto bg-gradient-to-r from-[#8B5CF6] to-[#38BDF8] mt-12"></div>
      <p className="text-[#B3B3B3] text-sm mt-4">
        © {new Date().getFullYear()} Hammad Azeem. All Rights Reserved.
      </p>
    </section>
  );
}
