import React from "react";

// assets
import heroLogoSrc from "../../assets/Landing/White.png";
import bgImgSrc from "../../assets/Landing/MIsd.png";

function HeroSection() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.36)), url(${bgImgSrc})`,
        }}
        className="bg-cover bg-center"
      >
        <div className="logo">
          <img className="" src={heroLogoSrc} alt="Abhyudaya Logo" />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
