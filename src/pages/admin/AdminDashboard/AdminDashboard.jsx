import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null); // ✅ Modal project

  const fetchProjects = async () => {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const fetchedProjects = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProjects(fetchedProjects);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    await deleteDoc(doc(db, "projects", id));
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleSaveEdit = async () => {
    if (!editingProject) return;
    const { id, title, description, websiteUrl, githubUrl, videoUrl } =
      editingProject;

    try {
      const projectRef = doc(db, "projects", id);
      await updateDoc(projectRef, {
        title,
        description,
        websiteUrl: websiteUrl || "",
        githubUrl: githubUrl || "",
        videoUrl: videoUrl || "",
        updatedAt: serverTimestamp(),
      });
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  if (loading)
    return (
      <div className="text-center text-gray-400 mt-20 text-lg">
        Loading projects...
      </div>
    );

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0A0F24] to-[#1A2238] text-[#E5E5E5] py-12 px-4 sm:px-8 md:px-16 font-[Poppins]">
      <h1 className="text-3xl font-[Orbitron] text-center text-[#C9A7FF] mb-10">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 shadow-lg hover:shadow-[#8B5CF6]/30 transition-all"
          >
            <h2 className="text-xl font-semibold text-[#C9A7FF] mb-2">
              {project.title}
            </h2>
            <p className="text-gray-300 text-sm mb-3 line-clamp-3">
              {project.description}
            </p>
            {project.websiteUrl && (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#38BDF8] hover:underline text-sm block mb-1"
              >
                🌐 Website
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B5CF6] hover:underline text-sm block mb-3"
              >
                💻 GitHub
              </a>
            )}

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setEditingProject(project)} // ✅ Opens modal
                className="bg-[#38BDF8] hover:bg-[#0EA5E9] text-white px-3 py-1.5 rounded-lg text-sm"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm"
              >
                🗑 Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ✅ Edit Modal */}
      <AnimatePresence>
        {editingProject && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-[#1E293B] w-full max-w-lg p-6 rounded-2xl shadow-2xl text-white border border-[#334155]"
            >
              <h3 className="text-xl font-[Orbitron] text-[#C9A7FF] mb-4 text-center">
                Edit Project
              </h3>

              <label className="block text-sm mb-1">Title</label>
              <input
                type="text"
                value={editingProject.title}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, title: e.target.value })
                }
                className="w-full px-3 py-2 mb-3 rounded-lg bg-[#0F172A] border border-[#334155] text-white"
              />

              <label className="block text-sm mb-1">Description</label>
              <textarea
                value={editingProject.description}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    description: e.target.value,
                  })
                }
                rows="4"
                className="w-full px-3 py-2 mb-3 rounded-lg bg-[#0F172A] border border-[#334155] text-white"
              />

              <label className="block text-sm mb-1">Website URL</label>
              <input
                type="text"
                value={editingProject.websiteUrl || ""}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    websiteUrl: e.target.value,
                  })
                }
                className="w-full px-3 py-2 mb-3 rounded-lg bg-[#0F172A] border border-[#334155] text-white"
                placeholder="Optional"
              />

              <label className="block text-sm mb-1">GitHub URL</label>
              <input
                type="text"
                value={editingProject.githubUrl || ""}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    githubUrl: e.target.value,
                  })
                }
                className="w-full px-3 py-2 mb-3 rounded-lg bg-[#0F172A] border border-[#334155] text-white"
                placeholder="Optional"
              />

              <label className="block text-sm mb-1">Video URL</label>
              <input
                type="text"
                value={editingProject.videoUrl || ""}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    videoUrl: e.target.value,
                  })
                }
                className="w-full px-3 py-2 mb-5 rounded-lg bg-[#0F172A] border border-[#334155] text-white"
                placeholder="Optional"
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={handleSaveEdit}
                  className="bg-[#38BDF8] hover:bg-[#0EA5E9] px-5 py-2 rounded-lg text-white"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingProject(null)}
                  className="bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
