import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion

// assets
import Vdo from "../../assets/Landing/vdo.mp4";
import smallLogoSrc from "../../assets/Landing/mmmut.png";
import Abhyudaya from "../../assets/Logo-images/Abhyudaya-combined.png";

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          src={Vdo}
          autoPlay
          loop
          muted
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/70"></div>

        {/* Abhyudaya Logo & Date */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full space-y-6">

       
        {/* Darkened overlay */}
        <div className="relative z-10 grid place-items-center overflow-hidden">
          <motion.img
            className="sm:w-3/4 w-full h-auto"
            src={Abhyudaya}
            alt="Small Abhyudaya Logo"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          />
        


           
<h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-white tracking-wide uppercase text-center">
  <span className="bg-gradient-to-r from-[#f7d77f] to-[#b58b3b] bg-clip-text text-transparent drop-shadow-lg">
    March 04 - March 06, 2024
  </span>
</h1>
 
        </div>

        {/* MMMUT Logo in Top Right Corner */}
        <img
          className="absolute right-5 top-5 w-16 h-16 animate-slide-in"
          src={smallLogoSrc}
          alt="MMMUT Logo"
        />
      </div>
      </div>
    </div>
  );
};

export default HeroSection;
