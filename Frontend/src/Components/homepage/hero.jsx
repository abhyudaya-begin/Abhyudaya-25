import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion

// assets
import Vdo from "../../assets/Landing/vdo.mp4";
import smallLogoSrc from "../../assets/Landing/mmmut.png";
import { Link } from "react-router-dom";
import Abhyudaya from "../../assets/Logo-images/Abhyudaya-combined.png";
import { useSelector } from "react-redux";

const HeroSection = () => {
   const  user  = useSelector((state) => state.user);
  return (
    <div className="relative w-full h-screen overflow-hidden shadow-[0_10px_20px_rgb(0,0,0)] transition duration-300 ease-in-out">

      <div className="absolute inset-0 flex items-center justify-center">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          src={Vdo}
          autoPlay
          loop
          muted
          playsInline
          
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
        


           
<h1 className=" text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-white tracking-wide uppercase text-center">
  <span className="bg-gradient-to-r from-[#f7d77f] to-[#b58b3b] bg-clip-text text-transparent drop-shadow-lg">
    APRIL 04 - APRIL 06, 2024
  </span>
</h1>

{!user && (
  <Link to="/profile">
  <div className="mt-4 flex items-center justify-center gap-x-6 md:hidden flex">
    
    <span className="rounded-full bg-gradient-to-r from-purple-300 to-indigo-300 px-6 py-3 text-md text-gray-900 font-semibold shadow-sm hover:from-purple-600 hover:to-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:text-gray-100 focus-visible:outline-indigo-400 transition-all duration-300 cursor-pointer">
      Register Now
    </span>
    
  </div>
  </Link>
)}

 
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
