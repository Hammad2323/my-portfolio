import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "@fontsource/poppins/500.css";
import "@fontsource/orbitron/700.css";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projectsData = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        
        .filter((p) => p.title && p.description);
      setProjects(projectsData);
    };
    fetchProjects();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0A0F24] to-[#1A2238] py-16 px-4 sm:px-8 font-[Poppins]">
  
      <motion.h1
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-3xl sm:text-4xl md:text-5xl font-[Orbitron] text-[#F8F8F8] mb-10 sm:mb-14"
      >
        My <span className="text-[#8B5CF6]">Projects</span>
      </motion.h1>

    
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              delay: index * 0.1,
              duration: 0.6,
              ease: "easeOut",
            }}
            whileHover={{ y: -8, scale: 1.03 }}
            className="relative bg-[#11162C] border border-[#1F2A44] rounded-2xl shadow-lg p-5 sm:p-6 group transition-all duration-500 hover:shadow-[#8B5CF6]/40 overflow-hidden"
          >
            
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#8B5CF6]/10 to-[#38BDF8]/10 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700"></div>

          
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-xl sm:text-2xl font-[Orbitron] text-[#C9A7FF] mb-3 group-hover:text-[#38BDF8] transition-colors duration-300">
                  {project.title}
                </h2>
                <p className="text-[#C7C7C7] text-sm sm:text-base leading-relaxed line-clamp-3 mb-6">
                  {project.description.slice(0, 150)}
                </p>
              </div>

              <Link
                to={`/projects/${project.id}`}
                className="inline-block self-start px-5 py-2 text-[#0A0F24] bg-gradient-to-r from-[#8B5CF6] to-[#38BDF8] font-semibold text-sm sm:text-base rounded-full shadow-md hover:shadow-[#8B5CF6]/50 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
