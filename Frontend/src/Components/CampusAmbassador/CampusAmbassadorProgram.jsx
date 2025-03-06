// File: CampusAmbassadorProgram.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import TabNavigation from "./TabNavigation";
import WhatIsCA from "./WhatIsCA";
import PerksAndBenefits from "./PerksAndBenifits";
import Leaderboard from "./LeaderBoard";
import CallToAction from "./CallToAction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles for toast

export default function CampusAmbassadorProgram() {
  const [activeTab, setActiveTab] = useState("what");

  const tabs = [
    { id: "what", label: "What is CA?" },
    { id: "perks", label: "Perks & Benefits" },
    { id: "leaderboard", label: "Leaderboard" }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-900 to-black text-white py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <Header itemVariants={itemVariants} />

        {/* Tabs Navigation */}
        <TabNavigation 
          tabs={tabs} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        {/* Content Area */}
        <motion.div 
          className="bg-blue-900/20 backdrop-blur-sm rounded-b-lg p-6 min-h-[400px] border border-blue-700/30"
          variants={itemVariants}
          layout
        >
          {activeTab === "what" && (
            <WhatIsCA 
              contentVariants={contentVariants} 
              itemVariants={itemVariants} 
              setActiveTab={setActiveTab}  // Pass setActiveTab to switch tabs
            />
          )}

          {activeTab === "perks" && (
            <PerksAndBenefits contentVariants={contentVariants} itemVariants={itemVariants} />
          )}

          {activeTab === "leaderboard" && (
            <Leaderboard contentVariants={contentVariants} itemVariants={itemVariants} />
          )}
        </motion.div>

        {/* Call to Action */}
        <CallToAction itemVariants={itemVariants} />
      </div>
      {/* 🔹 Add ToastContainer here for notifications */}
      <ToastContainer />
    </motion.div>
  );
}
