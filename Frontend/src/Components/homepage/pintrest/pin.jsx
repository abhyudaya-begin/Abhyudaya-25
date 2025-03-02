import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Pin = ({unique}) => {
console.log(unique)
  return (
    <div className="relative rounded-lg overflow-hidden">
    <LazyLoadImage
      src={unique}
      alt="Gallery Image"
      className="w-full h-auto"
      effect="blur"
      loading="lazy"
    />
  </div>
  );
};

export default Pin;
