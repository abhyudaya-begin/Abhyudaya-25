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
      className="flex flex-col overflow-x-hidden bg-[#120c0f] text-white"
      
    >
      <HeroSection />
      <Hero2Section /> 
      <CountDown />
      <Merchandise/>
      <ArtistSlider />
      <PinGrid/>  {/* All about theme and all */}


      {/* All over to 2nd year , u can add yr own code and make changes too as per yr convinience */}

      {/*Hello world*/}
    </div>
  );
};

export default IndexHome;
