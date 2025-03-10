import React from "react";
import Marquee from "react-fast-marquee";
import currentSponsors from "./currentSponser";

const SponsorSlider = () => {
  return (
    <div className="p-4 bg-black-100 rounded-lg shadow-md">
       <div className="text-center mb-24">
          <h1 className="text-5xl  md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x ">
        Our Sponsors
          </h1>
        </div>
      <Marquee speed={63} pauseOnHover={false} className="cursor-pointer">
        {currentSponsors.map((sponsor, index) => (
          <div key={index} className="mx-8 flex flex-col items-center">
            <img
              src={sponsor.image}
              alt={sponsor.name}
              className="w-60 h-36 object-contain"
            />
          
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default SponsorSlider;
