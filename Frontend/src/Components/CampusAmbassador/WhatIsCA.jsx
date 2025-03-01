// File: components/WhatIsCA.jsx
import { motion } from "framer-motion";

export default function WhatIsCA({ contentVariants, itemVariants }) {
  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={contentVariants}
      key="what"
    >
      <motion.div 
        className="bg-gradient-to-r from-blue-800/50 to-purple-900/50 p-6 rounded-lg border border-blue-500/30"
        variants={itemVariants}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Become the Face of Abhyudaya'25</h2>
        <p className="text-blue-100 mb-6">
          As a Campus Ambassador, you'll be the official representative of Abhyudaya'25 at your college. 
          You'll help spread the word about our events, coordinate with your peers, and be our connection 
          to talented students at your institution.
        </p>
        <p className="text-blue-100 mb-6">
          This program is designed to enhance your leadership, marketing, and communication skills while 
          expanding your network and offering exclusive advantages.
        </p>
        <h3 className="text-xl font-semibold mb-3 text-blue-300">Responsibilities:</h3>
        <ul className="list-disc pl-5 text-blue-100 space-y-2 mb-8">
          <li>Promote Abhyudaya'25 events at your college</li>
          <li>Coordinate registrations and participation</li>
          <li>Organize pre-event activities</li>
          <li>Create awareness through social media</li>
          <li>Provide feedback to improve our reach</li>
        </ul>
        <motion.button 
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-blue-500/50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          Apply Now
        </motion.button>
      </motion.div>
    </motion.div>
  );
}