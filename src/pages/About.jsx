import React from "react";
import { motion } from "framer-motion";
import { Code, Paintbrush, Rocket } from "lucide-react";

export default function About() {
  return (
    <section className="bg-gradient-to-b from-white to-orange-50 py-20 px-6 md:px-20 text-center md:text-left">
      {/* === About Intro === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto mb-16"
      >
        <h2 className="text-4xl font-bold text-orange-500 mb-6 text-center">
          About Me
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          I'm <span className="font-semibold text-gray-900">Hammad Azeem</span>,
          a passionate Frontend Developer who loves turning creative ideas into
          stunning, responsive, and user-friendly web interfaces. I focus on
          building smooth, interactive, and scalable digital experiences using
          modern web technologies like React, Tailwind CSS, and Firebase.
        </p>
      </motion.div>

      {/* === Highlights Section === */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          {
            icon: <Code className="text-orange-500 w-10 h-10 mb-3" />,
            title: "Frontend Development",
            desc: "Building fast, responsive, and dynamic web applications with React JS.",
          },
          {
            icon: <Paintbrush className="text-orange-500 w-10 h-10 mb-3" />,
            title: "UI/UX Design",
            desc: "Designing elegant and intuitive interfaces with a strong focus on usability.",
          },
          {
            icon: <Rocket className="text-orange-500 w-10 h-10 mb-3" />,
            title: "Performance & SEO",
            desc: "Optimizing web performance for speed, accessibility, and search visibility.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="bg-white shadow-xl p-8 rounded-2xl hover:-translate-y-2 transition-all duration-300"
            whileHover={{ scale: 1.03 }}
          >
            {item.icon}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
