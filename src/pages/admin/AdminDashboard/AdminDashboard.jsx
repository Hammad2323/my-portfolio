import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { uploadToCloudinary } from "../../../utils/uploadToCloudinary";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "@fontsource/poppins/500.css";
import "@fontsource/orbitron/700.css";

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      setProjects(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Please enter title and description");
      return;
    }

    setLoading(true);
    try {
      const imageUrls = [];
      for (const image of images) {
        const url = await uploadToCloudinary(image);
        imageUrls.push(url);
      }

      let videoUrl = "";
      if (video) {
        videoUrl = await uploadToCloudinary(video);
      }

      await addDoc(collection(db, "projects"), {
        title,
        description,
        images: imageUrls,
        videoUrl,
        timestamp: serverTimestamp(),
      });

      alert("✅ Project added successfully!");
      setTitle("");
      setDescription("");
      setImages([]);
      setVideo(null);
    } catch (error) {
      console.error("Error adding project:", error);
      alert("❌ Failed to add project. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this project?")) {
      await deleteDoc(doc(db, "projects", id));
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/projects/${id}`); // 🔗 Redirect to ProjectDetail
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0A0F24] to-[#1A2238] text-[#E5E5E5] py-16 px-6 font-[Poppins]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto bg-[#111827]/70 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-[#2D3C5A]"
      >
        <h2 className="text-4xl font-[Orbitron] text-center text-[#C9A7FF] mb-10">
          Admin Dashboard – Manage Projects
        </h2>

        {/* 🧠 Add New Project */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-[#0F172A]/70 p-6 rounded-2xl shadow-inner border border-[#2D3C5A] mb-12"
        >
          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#0F172A] border border-[#334155] text-white p-3 rounded-lg focus:ring-2 focus:ring-[#8B5CF6]"
          />

          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-[#0F172A] border border-[#334155] text-white p-3 rounded-lg focus:ring-2 focus:ring-[#38BDF8]"
            rows={4}
          />

          <div>
            <label className="block font-medium text-[#C9A7FF] mb-2">
              Upload Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImages([...e.target.files])}
              className="w-full text-sm text-gray-400"
            />
          </div>

          <div>
            <label className="block font-medium text-[#C9A7FF] mb-2">
              Upload Video (optional)
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
              className="w-full text-sm text-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-[#8B5CF6] to-[#38BDF8] text-white px-8 py-3 rounded-xl w-full font-semibold shadow-lg hover:opacity-90 transition-all duration-300"
          >
            {loading ? "Uploading..." : "Add Project"}
          </button>
        </form>

        {/* 🗂 Existing Projects */}
        <div>
          <h3 className="text-2xl font-[Orbitron] text-[#8B5CF6] mb-6">
            Existing Projects
          </h3>

          {projects.length === 0 ? (
            <p className="text-gray-400 text-center">No projects found.</p>
          ) : (
            <ul className="space-y-4">
              {projects.map((proj) => (
                <li
                  key={proj.id}
                  className="flex justify-between items-center bg-[#0F172A]/60 border border-[#2D3C5A] p-4 rounded-xl shadow-md"
                >
                  <span className="text-lg font-medium text-[#E5E5E5]">
                    {proj.title}
                  </span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(proj.id)}
                      className="bg-[#38BDF8]/80 hover:bg-[#38BDF8] text-white px-4 py-2 rounded-lg transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(proj.id)}
                      className="bg-red-500/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </section>
  );
}
