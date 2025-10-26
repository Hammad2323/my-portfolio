import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/Projects/ProjectDetails";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/admin/AdminDashboard/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";

function ProtectedRoute({ children }) {
  const isAdmin = localStorage.getItem("adminAuth") === "true";
  return isAdmin ? children : <Navigate to="/admin-login" replace />;
}

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 font-[Poppins]">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} /> 
            <Route path="/contact" element={<Contact />} />

            
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
