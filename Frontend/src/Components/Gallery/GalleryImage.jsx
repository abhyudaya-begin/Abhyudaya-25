import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const GalleryImage = ({unique}) => {

  return (
    <div className="relative rounded-lg overflow-hidden cursor-pointer select-none">
    <LazyLoadImage
      src={unique}
      alt="Gallery Image"
      className="w-full h-auto select-none"
      effect="blur"
      loading="lazy"
    />
  </div>
  );
};

export default GalleryImage;
