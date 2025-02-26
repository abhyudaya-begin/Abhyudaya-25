import React from "react";
import Masonry from "react-masonry-css";
import Pin from "./pin";




const PinGrid = () => {
  const breakpoints = {
    default: 4,
    1200: 3,
    900: 2,
    600: 1,
  };

  return (
    <div className="bg-[#120c0f]">
      <h1 className="text-center text-2xl text-gray-600 uppercase mb-4">Gallery</h1>
      <div>
        {photoUrls && (
          <Masonry
            breakpointCols={breakpoints}
            className="flex -ml-4 p-4"
            columnClassName="pl-4 bg-clip-padding"
          >
            {/* {photoUrls.map((photo, index) => (
              <Pin key={index} unique  = { photo} />
            ))} */}
          </Masonry>
        )}
      </div>
    </div>
  );
};

export default PinGrid;