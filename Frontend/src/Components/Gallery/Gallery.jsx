import React from "react";
import Masonry from "react-masonry-css";
import GalleryImage from "./GalleryImage";
import axios from "axios";
import { photoUrls } from "./PhotoUrls";


const Gallery = () => {
  const breakpoints = {
    default: 4,
    1200: 3,
    900: 2,
    600: 1,
  };

  return (
    <div className="bg-[#120c0f] pt-16 min-h-screen">
    <h1 className="text-4xl font-extrabold text-purple-400 sm:text-5xl text-center mb-16">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-200 to-indigo-100 animate-pulse">
              Event-`de`-25
            </span>
          </h1>
      <div>
        {photoUrls && (
          <Masonry
            breakpointCols={breakpoints}
            className="flex -ml-6 p-6 mb-8"
            columnClassName="pl-6 bg-clip-padding"
          >
            {photoUrls.map((photo, index) => (
              <GalleryImage key={index} unique={photo} />
            ))}
          </Masonry>
        )}
      </div>
    </div>
  );
};

export default Gallery;
