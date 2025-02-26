import React from "react";
import Hero2Section from "./hero2";
import HeroSection from "./hero";
import PinGrid from "./pintrest/PinGrid";
import ArtistSlider from "./slider/Slider";
import CountDown from "./countdown/CountDown";
import Merchandise from "./merchandise/Merchandise";
const IndexHome = () => {
  return (
    <div
      className="flex flex-col select-none overflow-x-hidden bg-[#120c0f] text-white"
      
    >
      <HeroSection />
      <Hero2Section /> 
      <CountDown />
      <Merchandise/>
      <ArtistSlider />
    
    </div>
  );
};

export default IndexHome;
