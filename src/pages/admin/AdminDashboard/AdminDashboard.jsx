import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { uploadToCloudinary } from "../../../utils/uploadToCloudinary";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Fetch all projects
  const fetchProjects = async () => {
    const q = collection(db, "projects");
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrls = [];
      let videoUrl = "";

      // Upload images
      for (let img of images) {
        const url = await uploadToCloudinary(img);
        imageUrls.push(url);
      }

      // Upload video if exists
      if (video) {
        videoUrl = await uploadToCloudinary(video);
      }

      if (editingId) {
        // Update existing project
        const projectRef = doc(db, "projects", editingId);
        await updateDoc(projectRef, {
          title,
          description,
          githubUrl,
          liveUrl,
          images: imageUrls,
          videoUrl,
        });
        setEditingId(null);
      } else {
        // Add new project
        await addDoc(collection(db, "projects"), {
          title,
          description,
          githubUrl,
          liveUrl,
          images: imageUrls,
          videoUrl,
          createdAt: serverTimestamp(),
        });
      }

      alert("✅ Project saved successfully!");
      setTitle("");
      setDescription("");
      setGithubUrl("");
      setLiveUrl("");
      setImages([]);
      setVideo(null);
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (project) => {
    setTitle(project.title);
    setDescription(project.description);
    setGithubUrl(project.githubUrl || "");
    setLiveUrl(project.liveUrl || "");
    setImages(project.images || []);
    setVideo(project.videoUrl || null);
    setEditingId(project.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await deleteDoc(doc(db, "projects", id));
      fetchProjects();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl mx-auto mb-12"
      >
        <h2 className="text-3xl font-bold mb-6 text-orange-500 text-center">
          {editingId ? "Edit Project" : "Add New Project"}
        </h2>

        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:ring-2 focus:ring-orange-400"
          required
        />

        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:ring-2 focus:ring-orange-400"
          required
        />

        <input
          type="url"
          placeholder="GitHub URL"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:ring-2 focus:ring-orange-400"
        />

        <input
          type="url"
          placeholder="Live URL"
          value={liveUrl}
          onChange={(e) => setLiveUrl(e.target.value)}
          className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:ring-2 focus:ring-orange-400"
        />

        <label className="block mb-2 font-semibold text-gray-700">Upload Images (2-10)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImages([...e.target.files])}
          className="mb-4"
        />

        <label className="block mb-2 font-semibold text-gray-700">Upload Video (optional)</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
          className="mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold w-full transition duration-200"
        >
          {loading ? "Saving..." : editingId ? "Update Project" : "Add Project"}
        </button>
      </form>

      {/* === Projects List === */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="bg-white shadow-lg rounded-2xl p-6 relative"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>

            <div className="flex gap-2 absolute top-4 right-4">
              <button
                onClick={() => handleEdit(project)}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
