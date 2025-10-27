import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../firebase";
import { motion, AnimatePresence } from "framer-motion";
import "@fontsource/poppins/500.css";
import "@fontsource/orbitron/700.css";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enlargedMedia, setEnlargedMedia] = useState(null);
  const [screenshotAttempt, setScreenshotAttempt] = useState(false);
  const [editing, setEditing] = useState({ type: null, index: null });
  const [addingMedia, setAddingMedia] = useState(false);
  const [newFile, setNewFile] = useState(null);

  const isAdmin = localStorage.getItem("adminAuth") === "true";

  // Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setProject({ id: docSnap.id, ...docSnap.data() });
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  // Screenshot prevention
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

  const refreshProject = async () => {
    const docRef = doc(db, "projects", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) setProject({ id: docSnap.id, ...docSnap.data() });
  };

  const handleDelete = async (type, index) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;

    const projectRef = doc(db, "projects", id);
    try {
      if (type === "image") {
        const url = project.images[index];
        await updateDoc(projectRef, { images: arrayRemove(url) });
      } else if (type === "video") {
        await updateDoc(projectRef, { videoUrl: "" });
      }
      refreshProject();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const handleEdit = async () => {
    if (!newFile) return alert("Please select a file");
    const projectRef = doc(db, "projects", id);

    try {
      const uploadedUrl = await uploadToCloudinary(newFile);

      if (editing.type === "image") {
        const updatedImages = [...project.images];
        updatedImages[editing.index] = uploadedUrl;
        await updateDoc(projectRef, { images: updatedImages });
      } else if (editing.type === "video") {
        await updateDoc(projectRef, { videoUrl: uploadedUrl });
      }

      setEditing({ type: null, index: null });
      setNewFile(null);
      refreshProject();
    } catch (err) {
      console.error("Error updating:", err);
    }
  };

  const handleAddMedia = async () => {
    if (!newFile) return alert("Please select a file");
    const projectRef = doc(db, "projects", id);

    try {
      const uploadedUrl = await uploadToCloudinary(newFile);
      if (uploadedUrl.includes(".mp4")) {
        await updateDoc(projectRef, { videoUrl: uploadedUrl });
      } else {
        await updateDoc(projectRef, { images: arrayUnion(uploadedUrl) });
      }

      setAddingMedia(false);
      setNewFile(null);
      refreshProject();
    } catch (err) {
      console.error("Error adding media:", err);
    }
  };

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
      className="min-h-screen bg-gradient-to-b from-[#0A0F24] to-[#1A2238] text-[#E5E5E5] py-16 px-4 sm:px-6 md:px-16 font-[Poppins] select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      <Link
        to="/projects"
        className="text-[#38BDF8] hover:text-[#8B5CF6] transition-colors block mb-6 text-lg sm:text-xl"
      >
        ← Back to Projects
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h1 className="text-3xl sm:text-4xl font-[Orbitron] mb-3 text-[#C9A7FF]">
          {project.title}
        </h1>
        <p className="text-[#C7C7C7] text-base sm:text-lg mb-8 leading-relaxed">
          {project.description}
        </p>

        {/* Images Grid */}
        {project.images && project.images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {project.images.map((url, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-2xl border border-[#2D3C5A] shadow-lg hover:shadow-[#8B5CF6]/30 transition-all duration-300 cursor-pointer"
                onClick={() => setEnlargedMedia({ type: "image", url })}
              >
                <img
                  src={url}
                  alt={`${project.title} ${index + 1}`}
                  className="w-full h-48 sm:h-56 object-cover transform hover:scale-105 transition-transform duration-500"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                />
                {isAdmin && (
                  <div className="absolute top-1 right-1 flex gap-1 sm:gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditing({ type: "image", index });
                      }}
                      className="bg-[#38BDF8]/70 px-2 py-1 rounded text-xs sm:text-sm"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete("image", index);
                      }}
                      className="bg-red-500/70 px-2 py-1 rounded text-xs sm:text-sm"
                    >
                      🗑️
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Video Section */}
        {project.videoUrl && (
          <div className="mt-6 relative">
            <h2 className="text-xl sm:text-2xl font-[Orbitron] text-[#8B5CF6] mb-3">
              Project Video
            </h2>
            <video
              src={project.videoUrl}
              className="w-full rounded-2xl border border-[#2D3C5A] shadow-lg cursor-pointer"
              onClick={() => setEnlargedMedia({ type: "video", url: project.videoUrl })}
              controls
              controlsList="nodownload noplaybackrate"
              onContextMenu={(e) => e.preventDefault()}
            />
            {isAdmin && (
              <div className="absolute top-0 right-0 flex gap-1 sm:gap-2 mt-1 mr-1">
                <button
                  onClick={() => setEditing({ type: "video", index: 0 })}
                  className="bg-[#38BDF8]/70 px-2 py-1 rounded text-xs sm:text-sm"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete("video")}
                  className="bg-red-500/70 px-2 py-1 rounded text-xs sm:text-sm"
                >
                  🗑️
                </button>
              </div>
            )}
          </div>
        )}

        {/* Add Media Button */}
        {isAdmin && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setAddingMedia(true)}
              className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium shadow-lg"
            >
              + Add Image or Video
            </button>
          </div>
        )}
      </motion.div>

      {/* Enlarged View */}
      <AnimatePresence>
        {enlargedMedia && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEnlargedMedia(null)}
          >
            {enlargedMedia.type === "image" ? (
              <motion.img
                src={enlargedMedia.url}
                className="max-w-full max-h-full rounded-2xl border border-[#8B5CF6] shadow-2xl object-contain select-none"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              />
            ) : (
              <motion.video
                src={enlargedMedia.url}
                className="max-w-full max-h-full rounded-2xl border border-[#8B5CF6] shadow-2xl select-none"
                controls
                controlsList="nodownload noplaybackrate"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              />
            )}
            <span className="absolute bottom-4 right-4 text-[#8B5CF6] text-xs sm:text-sm opacity-70 font-[Poppins] select-none">
              © Hammad Azeem
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {editing.type && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-[#1E293B] p-6 rounded-2xl shadow-2xl text-center w-11/12 sm:w-96">
              <h3 className="text-lg sm:text-xl mb-4">Update {editing.type}</h3>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => setNewFile(e.target.files[0])}
                className="w-full px-3 py-2 mb-4 rounded-md bg-[#0F172A] border border-[#334155] text-white"
              />
              <div className="flex flex-col sm:flex-row justify-center gap-2">
                <button
                  onClick={handleEdit}
                  className="bg-[#38BDF8] px-4 py-2 rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing({ type: null, index: null })}
                  className="bg-gray-600 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Media Modal */}
      <AnimatePresence>
        {addingMedia && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-[#1E293B] p-6 rounded-2xl shadow-2xl text-center w-11/12 sm:w-96">
              <h3 className="text-lg sm:text-xl mb-4">Add New Image or Video</h3>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => setNewFile(e.target.files[0])}
                className="w-full px-3 py-2 mb-4 rounded-md bg-[#0F172A] border border-[#334155] text-white"
              />
              <div className="flex flex-col sm:flex-row justify-center gap-2">
                <button
                  onClick={handleAddMedia}
                  className="bg-[#8B5CF6] px-4 py-2 rounded-lg"
                >
                  Add
                </button>
                <button
                  onClick={() => setAddingMedia(false)}
                  className="bg-gray-600 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screenshot Warning */}
      <AnimatePresence>
        {screenshotAttempt && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-[70]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="text-center text-white text-lg sm:text-2xl font-[Orbitron] bg-[#8B5CF6]/30 px-8 sm:px-10 py-4 sm:py-6 rounded-2xl border border-[#8B5CF6]"
            >
              🚫 Screenshots are not allowed
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
