import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProject(docSnap.data());
        }
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };
    fetchProject();
  }, [id]);

  if (!project) return <p className="text-center py-20">Loading...</p>;

  // Determine grid columns based on number of images
  const imagesCount = project.images?.length || (project.imageUrl ? 1 : 0);
  let gridCols = 1;
  if (imagesCount === 2) gridCols = 2;
  else if (imagesCount === 4) gridCols = 2;
  else if (imagesCount === 6) gridCols = 3;
  else if (imagesCount === 8) gridCols = 4;
  else if (imagesCount === 10) gridCols = 5;

  return (
    <section className="bg-orange-50 min-h-screen px-6 md:px-20 py-12 font-[Poppins]">
      {/* Back Link */}
      <Link
        to="/projects"
        className="flex items-center gap-2 text-orange-500 font-semibold mb-6"
      >
        <ArrowLeft size={20} /> Back to Projects
      </Link>

      {/* Project Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-white bg-orange-500 px-6 py-4 rounded-lg mb-8 text-center md:text-left shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {project.title}
      </motion.h1>

      {/* Project Description */}
      <motion.p
        className="text-gray-700 text-lg mb-8 max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {project.description}
      </motion.p>

      {/* Images / Videos Grid */}
      <div
        className={`grid gap-4 ${
          imagesCount > 0 ? `grid-cols-1 md:grid-cols-${gridCols}` : ""
        }`}
      >
        {/* Single image if imageUrl exists */}
        {project.imageUrl && !project.images && (
          <motion.img
            src={project.imageUrl}
            alt={project.title}
            className="w-full rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}

        {/* Multiple images */}
        {project.images?.map((img, i) => (
          <motion.img
            key={i}
            src={img}
            alt={`${project.title}-${i}`}
            className="w-full rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        ))}

        {/* Video */}
        {project.videoUrl && (
          <motion.video
            src={project.videoUrl}
            controls
            className="w-full rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}
      </div>

      {/* Links */}
      <div className="flex gap-4 mt-8">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            View Code
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Live Demo
          </a>
        )}
      </div>
    </section>
  );
}
