import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CampusAmbassadorProgram() {
  const [activeTab, setActiveTab] = useState("what");

  const tabs = [
    { id: "what", label: "What is CA?" },
    { id: "perks", label: "Perks & Benefits" },
    { id: "leaderboard", label: "Leaderboard" }
  ];

  // Mock data for leaderboard
  const leaderboardData = [
    { rank: 1, name: "Priya Sharma", college: "IIT Delhi", points: 1250 },
    { rank: 2, name: "Rahul Kumar", college: "NIT Trichy", points: 1120 },
    { rank: 3, name: "Ananya Patel", college: "BITS Pilani", points: 980 },
    { rank: 4, name: "Rohan Joshi", college: "VIT Vellore", points: 875 },
    { rank: 5, name: "Nehanish Singh", college: "IIIT Hyderabad", points: 820 },
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

  const tabVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
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

        {/* Tabs Navigation */}
        <div className="bg-blue-900/30 backdrop-blur-sm rounded-t-lg p-1 mb-1 border-b border-blue-700/50 flex flex-wrap">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 sm:px-6 text-sm sm:text-base font-medium rounded-t-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "text-blue-300 hover:text-white hover:bg-blue-800/50"
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

        {/* Content Area */}
        <motion.div 
          className="bg-blue-900/20 backdrop-blur-sm rounded-b-lg p-6 min-h-[400px] border border-blue-700/30"
          variants={itemVariants}
          layout
        >
          {/* What is CA? */}
          {activeTab === "what" && (
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
          )}

          {/* Perks & Benefits */}
          {activeTab === "perks" && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial="hidden"
              animate="visible"
              variants={contentVariants}
              key="perks"
            >
              {[
                {
                  title: "Official Certificate",
                  description: "Receive an official certificate recognizing your contribution to Abhyudaya'25",
                  icon: "🏆"
                },
                {
                  title: "Free Merchandise",
                  description: "Get exclusive Abhyudaya'25 merchandise including T-shirts and goodies",
                  icon: "👕"
                },
                {
                  title: "Priority Access",
                  description: "Enjoy VIP access to all events and workshops during the fest",
                  icon: "🎟️"
                },
                {
                  title: "Networking Opportunities",
                  description: "Connect with industry professionals and expand your network",
                  icon: "🤝"
                },
                {
                  title: "Leadership Development",
                  description: "Enhance your leadership, marketing, and communication skills",
                  icon: "📈"
                },
                {
                  title: "Cash Incentives",
                  description: "Earn cash rewards based on your performance and referrals",
                  icon: "💰"
                }
              ].map((perk, index) => (
                <motion.div 
                  key={index}
                  className="bg-gradient-to-br from-blue-800/40 to-purple-900/40 p-5 rounded-lg border border-blue-500/30"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <div className="text-4xl mb-3">{perk.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-blue-300">{perk.title}</h3>
                  <p className="text-blue-100">{perk.description}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Leaderboard */}
          {activeTab === "leaderboard" && (
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
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="mt-12 text-center"
          variants={itemVariants}
        >
          <p className="text-blue-300 mb-2">Applications closing soon! Join the community of campus leaders.</p>
          <p className="text-blue-400 text-sm mb-6">Questions? Contact us at campus@abhyudaya.in</p>
        </motion.div>
      </div>
    </motion.div>
  );
}