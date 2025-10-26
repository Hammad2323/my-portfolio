import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { motion, AnimatePresence } from "framer-motion";
import "@fontsource/poppins/500.css";
import "@fontsource/orbitron/700.css";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [enlargedVideo, setEnlargedVideo] = useState(null);
  const [screenshotAttempt, setScreenshotAttempt] = useState(false);

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

 
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "PrintScreen") {
        e.preventDefault();
        setScreenshotAttempt(true);
        setTimeout(() => setScreenshotAttempt(false), 1500);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
    <section
      className="min-h-screen bg-gradient-to-b from-[#0A0F24] to-[#1A2238] text-[#E5E5E5] py-20 px-6 md:px-16 font-[Poppins] select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
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
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-2xl border border-[#2D3C5A] shadow-lg hover:shadow-[#8B5CF6]/30 transition-all duration-500 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => setEnlargedImage(url)}
              >
                <img
                  src={url}
                  alt={`${project.title} ${index + 1}`}
                  className="w-full h-60 object-cover transform hover:scale-110 transition-transform duration-700"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                />
              </motion.div>
            ))}
          </div>
        )}

       
        {project.videoUrl && (
          <div className="mt-10">
            <h2 className="text-2xl font-[Orbitron] text-[#8B5CF6] mb-4">
              Project Video
            </h2>
            <motion.div
              className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden border border-[#2D3C5A] shadow-lg cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => setEnlargedVideo(project.videoUrl)}
            >
              <video
                src={project.videoUrl}
                muted
                playsInline
                preload="metadata"
                className="w-full object-cover"
                onContextMenu={(e) => e.preventDefault()}
                controlsList="nodownload noplaybackrate"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-lg font-semibold">
                ▶ Click to Play Video
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>

      
      <AnimatePresence>
        {enlargedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEnlargedImage(null)}
          >
            <motion.img
              src={enlargedImage}
              alt="Enlarged Project"
              className="max-w-[90%] max-h-[85%] rounded-2xl border border-[#8B5CF6] shadow-2xl object-contain select-none"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
            <span className="absolute bottom-6 right-10 text-[#8B5CF6] text-sm opacity-70 font-[Poppins] select-none">
              © Hammad Azeem
            </span>
          </motion.div>
        )}
      </AnimatePresence>

     
      <AnimatePresence>
        {enlargedVideo && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEnlargedVideo(null)}
          >
            <motion.video
              src={enlargedVideo}
              autoPlay
              controls
              className="max-w-[90%] max-h-[85%] rounded-2xl border border-[#8B5CF6] shadow-2xl select-none"
              controlsList="nodownload noplaybackrate"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
            <span className="absolute bottom-6 right-10 text-[#8B5CF6] text-sm opacity-70 font-[Poppins] select-none">
              © Hammad Azeem
            </span>
          </motion.div>
        )}
      </AnimatePresence>

  
      <AnimatePresence>
        {screenshotAttempt && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="text-center text-white text-2xl font-[Orbitron] bg-[#8B5CF6]/30 px-10 py-6 rounded-2xl border border-[#8B5CF6]"
            >
              🚫 Screenshots are not allowed
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
