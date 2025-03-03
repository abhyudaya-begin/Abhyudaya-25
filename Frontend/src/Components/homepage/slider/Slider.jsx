import React, { useEffect } from "react";
import Artist from "./Artist";

const ArtistSlider = () => {
  useEffect(() => {
    // Add the external CSS link
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://carousel-slider.uiinitiative.com/assets/index.0f26cec9.css";
    document.head.appendChild(link);

    // Add the module preload link
    const preloadLink = document.createElement("link");
    preloadLink.rel = "modulepreload";
    preloadLink.href =
      "https://carousel-slider.uiinitiative.com/assets/vendor.4ea4e284.js";
    document.head.appendChild(preloadLink);

    // Add the external script
    const script = document.createElement("script");
    script.type = "module";
    script.crossOrigin = "anonymous";
    script.src =
      "https://carousel-slider.uiinitiative.com/assets/index.8457301f.js";
    document.body.appendChild(script);

    // Cleanup script and links on unmount
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(preloadLink);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div className="swiper swiper-carousel swiper-horizontal swiper-watch-progress w-full h-96">
        <div className="swiper-wrapper">
          {Artist.map((artist, index) => (
            <div key={index} className="swiper-slide flex justify-center items-center">
              <div className="swiper-carousel-animate-opacity">
                <img
                  src={artist.link}
                  alt={artist.name}
                  className="object-center object-cover w-72 h-72 rounded-xl"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
        <div className="swiper-pagination"></div>
      </div>
    </>
  );
};

export default ArtistSlider;
