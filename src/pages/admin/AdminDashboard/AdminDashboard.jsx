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
import { uploadToCloudinary } from "../../../utils/uploadToCloudinary";

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all projects from Firestore
  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      setProjects(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchProjects();
  }, []);

  // Upload images and video to Cloudinary and save to Firestore
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

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Admin Dashboard – Manage Projects
      </h2>

      {/* Add New Project Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded-md"
        />

        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded-md"
          rows={4}
        />

        <div>
          <label className="font-medium">Upload Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages([...e.target.files])}
            className="block w-full mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Upload Video (optional)</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            className="block w-full mt-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 transition"
        >
          {loading ? "Uploading..." : "Add Project"}
        </button>
      </form>

      {/* Project List */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-3">Existing Projects</h3>
        {projects.length === 0 ? (
          <p className="text-gray-500">No projects found.</p>
        ) : (
          <ul className="space-y-3">
            {projects.map((proj) => (
              <li
                key={proj.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>{proj.title}</span>
                <button
                  onClick={() => handleDelete(proj.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
