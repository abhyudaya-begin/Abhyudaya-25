import { motion } from "framer-motion";

export default function TabButton({ tabs, activeTab, setActiveTab, tabVariants }) {
  return (
    <div className="bg-blue-900/30 backdrop-blur-sm rounded-t-lg p-1 mb-1 border-b border-blue-700/50 flex flex-wrap">
      {tabs.map((tab, index) => (
        <motion.button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`py-3 px-4 sm:px-6 text-sm sm:text-base font-medium rounded-t-lg ${
            activeTab === tab.id ? "bg-blue-600 text-white" : "text-blue-300 hover:text-white hover:bg-blue-800/50"
          }`}
          variants={tabVariants}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          {tab.label}
        </motion.button>
      ))}
    </div>
  );
}
