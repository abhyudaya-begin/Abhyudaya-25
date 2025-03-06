import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

export default function CAApplicationPopup({ isOpen, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const user = useSelector(state=> state.user.user.user);
  
  // 🔹 Hardcoded user data (Replace this with API call when backend is ready)
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    college: user.institution
  });

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Successfully registered as Campus Ambassador!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });

      onSuccess(); // Notify parent component
      setLoading(false);
      onClose(); // Close the popup
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div 
        className="bg-white text-black p-6 rounded-lg shadow-lg w-[400px]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <h2 className="text-xl font-bold mb-4">Apply as Campus Ambassador</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            value={formData.fullName} 
            placeholder="Full Name" 
            className="w-full px-3 py-2 border rounded" 
            readOnly 
            disabled={true}
          />
          <input 
            type="email" 
            value={formData.email} 
            placeholder="Email" 
            className="w-full px-3 py-2 border rounded" 
            readOnly 
            disabled={true}
          />
          <input 
            type="text" 
            value={formData.college} 
            placeholder="College Name" 
            className="w-full px-3 py-2 border rounded" 
            readOnly 
            disabled={true}
          />
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Applying..." : "Apply Now"}
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-blue-500 hover:underline block text-center">Cancel</button>
      </motion.div>
    </div>
  );
}



