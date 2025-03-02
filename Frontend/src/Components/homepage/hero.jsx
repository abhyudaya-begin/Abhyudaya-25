import React from "react";

// assets
import heroLogoSrc from "../../assets/Landing/White.png";
import Vdo from "../../assets/Landing/vdo.mp4"; // Import the video
import smallLogoSrc from "../../assets/Landing/mmmut.png"; // Import the small logo
import small from "../../assets/Logo-images/Abhyudaya.png";

function HeroSection() {
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
          <img
            className="w-30 h-30 mt-20 animate-slide-in" // Apply animation to small logo
            src={small}
            alt="Small Abhyudaya Logo"
          />
          <img
            className="w-3/4 h-auto animate-ease-out" // Animate white logo
            src={heroLogoSrc}
            alt="Abhyudaya Logo"
          />
        </div>
        <img
          className="absolute right-5 top-5 w-16 h-16 animate-slide-in" // Slide-in animation
          src={smallLogoSrc}
          alt="MMMUT Logo"
        />
      </div>
    </div>
  );
}

export default HeroSection;