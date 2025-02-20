import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./Pin.css";

const Pin = ({ photoUrl }) => {
  return (
    <div className="pin">
      <LazyLoadImage
        src={photoUrl}
        alt="Pin"
        className="pin-image"
        effect="blur"
      />
    </div>
  );
};

export default Pin;