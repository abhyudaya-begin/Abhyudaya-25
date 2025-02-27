import React from "react";
import Hero2Section from "./hero2";
import HeroSection from "./hero";
import PinGrid from "./pintrest/PinGrid";
import ArtistSlider from "./slider/Slider";
import CountDown from "./countdown/CountDown";
import Merchandise from "./merchandise/Merchandise";
import Stats from "./stats";
const IndexHome = () => {
  return (
    <div
      className="flex flex-col select-none overflow-x-hidden gap-40 items-center bg-[#120c0f] text-white"
      
    >
      <HeroSection />
      <Hero2Section /> 
      <CountDown />
      {/* <ArtistSlider/> */}
      <Stats/>
      <ArtistSlider />
      <Merchandise/>
    
    </div>
  );
};

export default IndexHome;
