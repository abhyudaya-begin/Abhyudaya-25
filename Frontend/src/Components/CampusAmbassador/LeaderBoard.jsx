// File: components/Leaderboard.jsx
import { motion } from "framer-motion";

export default function Leaderboard({ contentVariants, itemVariants }) {
  // Mock data for leaderboard
  const leaderboardData = [
    { rank: 1, name: "Priya Sharma", college: "IIT Delhi", points: 1250 },
    { rank: 2, name: "Rahul Kumar", college: "NIT Trichy", points: 1120 },
    { rank: 3, name: "Ananya Patel", college: "BITS Pilani", points: 980 },
    { rank: 4, name: "Rohan Joshi", college: "VIT Vellore", points: 875 },
    { rank: 5, name: "Neha Singh", college: "IIIT Hyderabad", points: 820 },
  ];

  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={contentVariants}
      key="leaderboard"
    >
      <motion.h2 
        className="text-2xl font-bold mb-6 text-center text-blue-300"
        variants={itemVariants}
      >
        Top Performing Campus Ambassadors
      </motion.h2>
      <motion.div 
        className="overflow-x-auto"
        variants={itemVariants}
      >
        <table className="min-w-full divide-y divide-blue-700">
          <thead className="bg-blue-900/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200 uppercase tracking-wider">College</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200 uppercase tracking-wider">Points</th>
            </tr>
          </thead>
          <tbody className="bg-blue-800/20 divide-y divide-blue-700">
            {leaderboardData.map((entry, index) => (
              <motion.tr 
                key={index} 
                className="transition-colors hover:bg-blue-700/30"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.2)" }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    entry.rank === 1 ? "bg-yellow-500" :
                    entry.rank === 2 ? "bg-gray-300" :
                    entry.rank === 3 ? "bg-yellow-700" : "bg-blue-700"
                  } text-white font-bold`}>
                    {entry.rank}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-blue-100 font-medium">{entry.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-blue-200">{entry.college}</td>
                <td className="px-6 py-4 whitespace-nowrap font-bold text-blue-300">{entry.points}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
      <motion.div 
        className="text-center mt-8"
        variants={itemVariants}
      >
        <p className="text-blue-300 mb-4">Don't see your name here yet?</p>
        <p className="text-blue-200 mb-6">Complete more tasks and climb the leaderboard!</p>
        <motion.button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          View Full Leaderboard
        </motion.button>
      </motion.div>
    </motion.div>
  );
}