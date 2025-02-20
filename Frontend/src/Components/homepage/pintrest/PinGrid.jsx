import React from "react";
import Masonry from "react-masonry-css";
import "./PinGrid.css";
import Pin from "./pin";

import image1 from "../../../assets/Glimses/glimpse1.png";
import image2 from "../../../assets/Glimses/glimpse2.png";
import image3 from "../../../assets/Glimses/glimpse3.png";
import image4 from "../../../assets/Glimses/glimpse4.png";
import image5 from "../../../assets/Glimses/glimpse5.png";
import image6 from "../../../assets/Glimses/glimpse6.png";
import image7 from "../../../assets/Glimses/glimpse7.png";
import image8 from "../../../assets/Glimses/glimpse8.png";
import image9 from "../../../assets/Glimses/glimpse9.png";
import image10 from "../../../assets/Glimses/glimpse10.png";
import image11 from "../../../assets/Glimses/glimpse11.png";
import image12 from "../../../assets/Glimses/glimpse12.png";
import image13 from "../../../assets/Glimses/glimpse13.png";
import image14 from "../../../assets/Glimses/glimpse14.png";
import image15 from "../../../assets/Glimses/glimpse15.png";
import image16 from "../../../assets/Glimses/glimpse16.png";
import image17 from "../../../assets/Glimses/glimpse17.png";
import image18 from "../../../assets/Glimses/glimpse18.png";
import image19 from "../../../assets/Glimses/glimpse19.png";
import image20 from "../../../assets/Glimses/glimpse20.png";
import image21 from "../../../assets/Glimses/glimpse21.png";
import image22 from "../../../assets/Glimses/glimpse22.png";

import { div } from "motion/react-client";

const photoUrls = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
  image16,
  image17,
  image18,
  image19,
  image20,
  image21,
  image22,
];

const PinGrid = () => {
  const breakpoints = {
    default: 4,
    1200: 3,
    900: 2,
    600: 1,
  };

  return (
    <div>
    <h1 className="heading">Gallery</h1>
    <div>
      {photoUrls && (
        <Masonry breakpointCols={breakpoints} className="masonry-grid" columnClassName="masonry-grid_column">
          {photoUrls.map((photoUrl, index) => (
            <Pin key={index} photoUrl={photoUrl} />
          ))}
        </Masonry>
      )}
    </div>
    </div>
  );
};

export default PinGrid;