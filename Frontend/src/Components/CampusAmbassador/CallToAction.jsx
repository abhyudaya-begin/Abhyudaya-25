// File: components/CallToAction.jsx
import { motion } from "framer-motion";

export default function CallToAction({ itemVariants }) {
  return (
    <motion.div 
      className="mt-12 text-center"
      variants={itemVariants}
    >
      <p className="text-blue-300 mb-2">Applications closing soon! Join the community of campus leaders.</p>
      <p className="text-blue-400 text-sm mb-6">Questions? Contact us at campus@abhyudaya.in</p>
    </motion.div>
  );
}