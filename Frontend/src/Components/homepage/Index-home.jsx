import React from "react";
import Hero2Section from "./hero2";
import HeroSection from "./hero";

import ArtistSlider from "./slider/Slider";
import CountDown from "./countdown/CountDown";
import Merchandise from "./merchandise/Merchandise";
import Stats from "./stats";
const IndexHome = () => {
  return (
    <div
      className="flex flex-col select-none overflow-x-hidden gap-30 items-center bg-black text-white"
      
    >
      <HeroSection />
      <Hero2Section /> 
      <CountDown />
      {/* <ArtistSlider/> */}
      <Stats/>
      <ArtistSlider id="artists"/>
      <Merchandise/>
     
    
    </div>
  );
};

export default IndexHome;
