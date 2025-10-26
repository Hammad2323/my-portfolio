import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { motion } from "framer-motion";
import "@fontsource/poppins/500.css";
import "@fontsource/orbitron/700.css";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setProject(docSnap.data());
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading)
    return <p className="text-center mt-20 text-gray-400">Loading project...</p>;

  if (!project)
    return (
      <div className="text-center mt-20 text-gray-400">
        <p>Project not found.</p>
        <Link to="/projects" className="text-[#38BDF8] hover:underline mt-4 block">
          ← Back to Projects
        </Link>
      </div>
    );

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0A0F24] to-[#1A2238] text-[#E5E5E5] py-20 px-6 md:px-16 font-[Poppins] select-none">
      <Link
        to="/projects"
        className="text-[#38BDF8] hover:text-[#8B5CF6] transition-colors block mb-8 text-lg"
      >
        ← Back to Projects
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-5xl font-[Orbitron] mb-4 text-[#C9A7FF]">
          {project.title}
        </h1>
        <p className="text-[#C7C7C7] text-lg mb-10 leading-relaxed">
          {project.description}
        </p>

        
        {project.images && project.images.length > 0 && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            {project.images.map((url, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl border border-[#2D3C5A] shadow-lg hover:shadow-[#8B5CF6]/30 transition-all duration-500"
              >
                <img
                  src={url}
                  alt={`${project.title} ${index + 1}`}
                  className="w-full h-60 object-cover transform hover:scale-110 transition-transform duration-700"
                  onContextMenu={(e) => e.preventDefault()} 
                  draggable="false"
                />
              </div>
            ))}
          </div>
        )}

      
        {project.videoUrl && (
          <div className="mt-10">
            <h2 className="text-2xl font-[Orbitron] text-[#8B5CF6] mb-4">
              Project Video
            </h2>
            <video
              controls
              src={project.videoUrl}
              className="w-full max-w-3xl mx-auto rounded-2xl border border-[#2D3C5A] shadow-lg"
              onContextMenu={(e) => e.preventDefault()} 
              controlsList="nodownload noplaybackrate"
            />
          </div>
        )}
      </motion.div>
    </section>
  );
}
