import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import currentSponsors from "./currentSponser";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

const SponsorSlider = () => {
  return (
    <div className="relative w-full max-w-none mx-auto px-6 py-12 bg-gradient-to-b from-gray-900 to-black">

      <Swiper
  modules={[Autoplay]}
  spaceBetween={20}
  slidesPerView={1}
  loop={true}
  centeredSlides={true}
  autoplay={{
    delay: 2000,
    disableOnInteraction: false,
    waitForTransition: false,
  }}
  breakpoints={{
    640: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
  }}
  className="perspective-3d"
>

        {currentSponsors.map((sponsor, index) => (
          <SwiperSlide key={index} className="flex justify-center">
           <div className="p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">

              <img 
                src={sponsor.image} 
                alt={`Sponsor ${index + 1}`} 
                className="w-40 h-40 object-contain mx-auto"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SponsorSlider;



