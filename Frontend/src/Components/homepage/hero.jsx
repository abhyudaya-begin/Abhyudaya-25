import React from "react";

// assets
import heroLogoSrc from "../../assets/Landing/White.png";
import bgImgSrc from "../../assets/Landing/MIsd.png";

function HeroSection() {
  return (
    <div
      style={{
        position: "relative",
        width: "auto",
        height: "100vh", // Full viewport height
        display: "grid",
        placeItems: "center",
        alignItems:"center",
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.36)), url(${bgImgSrc})`,
        backgroundSize: "cover", // Make sure image covers the entire area
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat", // Prevent repeating
      }}
    >
      <div className="logo">
        <img className="" src={heroLogoSrc} alt="Abhyudaya Logo" />
      </div>
    </div>
  );
}

export default HeroSection;
