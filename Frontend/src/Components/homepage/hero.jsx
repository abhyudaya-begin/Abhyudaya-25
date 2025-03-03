import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion

// assets
import heroLogoSrc from "../../assets/Landing/White.png";
import Vdo from "../../assets/Landing/vdo.mp4"; // Import the video
import smallLogoSrc from "../../assets/Landing/mmmut.png"; // Import the small logo
import small from "../../assets/Logo-images/Abhyudaya.png";

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen grid place-items-center">
      <div className="absolute grid place-items-center h-full w-full overflow-hidden">
        <video
          className="absolute w-full h-full object-cover"
          src={Vdo}
          autoPlay
          loop
          muted
        />
        <div className="absolute w-full h-full bg-black opacity-50"></div>{" "}
        {/* Darkened overlay */}
        <div className="relative z-10 grid place-items-center overflow-hidden">
          <motion.img
            className="w-30 h-30 mt-20"
            src={small}
            alt="Small Abhyudaya Logo"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.img
            className="w-3/4 h-auto"
            src={heroLogoSrc}
            alt="Abhyudaya Logo"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
          />
        </div>
        <img
          className="absolute right-5 top-5 w-16 h-16" // Removed animation
          src={smallLogoSrc}
          alt="MMMUT Logo"
        />
      </div>
    </div>
  );
};

export default HeroSection;
