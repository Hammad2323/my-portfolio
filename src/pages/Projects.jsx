import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import { Github, Globe } from "lucide-react";
import { Link } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="bg-white py-20 px-6 md:px-20 font-[Poppins]">
      <h2 className="text-4xl font-bold text-orange-500 mb-12 text-center">
        My Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <Link key={project.id} to={`/projects/${project.id}`}>
            <motion.div
              className="bg-white shadow-2xl rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 text-gray-900">{project.title}</h3>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <div className="flex gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition"
                      onClick={(e) => e.stopPropagation()} // prevent Link click
                    >
                      <Github /> Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-gray-700 hover:text-orange-500 transition"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Globe /> Live
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
