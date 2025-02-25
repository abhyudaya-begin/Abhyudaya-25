import React from "react";

// assets
import heroLogoSrc from "../../assets/Landing/White.png";
import bgImgSrc from "../../assets/Landing/MIsd.png";

function HeroSection() {
  return (
    <div className="relative w-full h-screen grid place-items-center">
      <div
        className="absolute grid place-items-center h-full w-full overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.36)), url(${bgImgSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="grid place-items-center overflow-hidden">
          <img className="max-w-full h-auto" src={heroLogoSrc} alt="Abhyudaya Logo" />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;