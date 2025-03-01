// File: components/Header.jsx
import { motion } from "framer-motion";

export default function Header({ itemVariants }) {
  return (
    <motion.div 
      className="text-center mb-12"
      variants={itemVariants}
    >
      <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400">
        Campus Ambassador Program
      </h1>
      <p className="text-lg text-blue-200 max-w-3xl mx-auto">
        Represent Abhyudaya'25 at your college and unlock amazing opportunities
      </p>
    </motion.div>
  );
}