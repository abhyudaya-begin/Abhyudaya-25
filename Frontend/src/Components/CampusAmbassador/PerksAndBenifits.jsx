// File: components/PerksAndBenefits.jsx
import { motion } from "framer-motion";

export default function PerksAndBenefits({ contentVariants, itemVariants }) {
  const perks = [
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
  ];

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      initial="hidden"
      animate="visible"
      variants={contentVariants}
      key="perks"
    >
      {perks.map((perk, index) => (
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
  );
}