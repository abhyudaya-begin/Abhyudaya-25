import React from "react";
import Marquee from "react-fast-marquee";
import currentSponsors from "./currentSponser";

const SponsorSlider = () => {
  return (
    <div className="p-5 bg-black-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Our Sponsors</h2>
      <Marquee speed={90} pauseOnHover={true}>
        {currentSponsors.map((sponsor, index) => (
          <div key={index} className="mx-8 flex flex-col items-center">
            <img
              src={sponsor.image}
              alt={sponsor.name}
              className="w-36 h-36 object-contain"
            />
            <p className="mt-2 font-medium">{sponsor.name}</p>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default SponsorSlider;
