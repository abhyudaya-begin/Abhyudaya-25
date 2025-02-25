import React from "react";
import Masonry from "react-masonry-css";
import Pin from "./pin";

const photoUrls = [
  { url: "https://www.mediafire.com/convkey/kr344qc7krpjyi5/glimpse1.png", description: "Glimpse 1" },
  { url: "https://www.mediafire.com/convkey/86u508mktnly37o/glimpse2.png", description: "Glimpse 2" },
  { url: "https://www.mediafire.com/convkey/s8f2pfycd0lrtlo/glimpse3.png", description: "Glimpse 3" },
  { url: "https://www.mediafire.com/convkey/4lpty6mjoe4jiix/glimpse4.png", description: "Glimpse 4" },
  { url: "https://www.mediafire.com/convkey/xvv27c9mh1hysie/glimpse5.png", description: "Glimpse 5" },
  { url: "https://www.mediafire.com/convkey/z5zleotumjnleob/glimpse6.png", description: "Glimpse 6" },
  { url: "https://www.mediafire.com/convkey/nn5pd639r4iaihd/glimpse7.png", description: "Glimpse 7" },
  { url: "https://www.mediafire.com/convkey/5gyn0qbc40v0quk/glimpse8.png", description: "Glimpse 8" },
  { url: "https://www.mediafire.com/convkey/h82wc5opql7i11e/glimpse9.png", description: "Glimpse 9" },
  { url: "https://www.mediafire.com/convkey/izzvchbfdvnlz0o/glimpse10.png", description: "Glimpse 10" },
  { url: "https://www.mediafire.com/convkey/v8bd6l5ibknos7s/glimpse11.png", description: "Glimpse 11" },
  { url: "https://www.mediafire.com/convkey/si80b3h0rnto0un/glimpse13.png", description: "Glimpse 13" },
  { url: "https://www.mediafire.com/convkey/8t0gei7hze56bn2/glimpse12.png", description: "Glimpse 12" },
  { url: "https://www.mediafire.com/convkey/s88qa6d8pi733wu/glimpse14.png", description: "Glimpse 14" },
  { url: "https://www.mediafire.com/convkey/tu2j2b7qymb2hun/glimpse15.png", description: "Glimpse 15" },
  { url: "https://www.mediafire.com/convkey/pz7ttydaltlrp8v/glimpse16.png", description: "Glimpse 16" },
  { url: "https://www.mediafire.com/convkey/1awxqsvwyaavron/glimpse17.png", description: "Glimpse 17" },
  { url: "https://www.mediafire.com/convkey/k86ik25gv53e78c/glimpse18.png", description: "Glimpse 18" },
  { url: "https://www.mediafire.com/convkey/du5geofgd1nvnu7/glimpse19.png", description: "Glimpse 19" },
  { url: "https://www.mediafire.com/convkey/hnca3tde483lk0i/glimpse20.png", description: "Glimpse 20" },
  { url: "https://www.mediafire.com/convkey/p2n53x0zt9ful54/glimpse21.png", description: "Glimpse 21" },
  { url: "https://www.mediafire.com/convkey/kstkbsq2hx6ppm1/glimpse22.png", description: "Glimpse 22" },
];

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
            {photoUrls.map((photo, index) => (
              <Pin key={index} photoUrl={photo.url} description={photo.description} />
            ))}
          </Masonry>
        )}
      </div>
    </div>
  );
};

export default PinGrid;