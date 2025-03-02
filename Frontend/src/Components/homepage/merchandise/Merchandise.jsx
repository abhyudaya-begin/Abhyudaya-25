import React from "react";
import blackTee from "../../../assets/Logo-images/blackTshirt.jpg";

const FlipCard = ({ image, title, details, price }) => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 h-[500px] lg:h-[600px] 2xl:h-[600px] m-4 perspective-[1200px]">
      <div className="relative w-full h-full transition-transform duration-1000 ease-in-out transform-style-3d group [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]">
        {/* Front Side */}
          <div className="absolute w-full h-full  overflow-hidden rounded-[5%] bg-gradient-to-b from-gray-700 to-gray-900 shadow-xl flex flex-col items-center justify-center p-4 [backface-visibility:hidden]">
            <figure className="relative w-full h-[90%] flex flex-col justify-center items-center">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover shadow-md rounded-[5%] overflow-hidden"
              />
            </figure>
            <figcaption className="text-white text-lg font-bold mt-4 bg-gradient-to-r from-purple-500 to-indigo-500 px-4 py-2 rounded-lg shadow-lg w-full text-center border-2 border-white">
              {title}
            </figcaption>
          </div>

          {/* Back Side */}
        <div className="absolute w-full h-full rounded-[5%] bg-gradient-to-b from-gray-900 to-black shadow-xl flex flex-col items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden] p-4 text-white">
          <h2 className="text-xl font-extrabold mb-2 text-gray-200 text-center">
            {title}
          </h2>
          <ul className="text-sm opacity-90 space-y-2 px-4 text-center">
            {details.slice(0, 3).map((detail, index) => (
              <li key={index} className="list-disc text-gray-300">
                {detail}
              </li>
            ))}
          </ul>
          <p className="text-lg font-bold mt-4 text-yellow-400">
            Price: {price}
          </p>
          <a href="https://forms.gle/YBM1q9oevFvUYEA29" target="_blank" rel="noreferrer">
          <button className="mt-3 px-6 py-2 text-white font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full hover:from-orange-600 hover:to-yellow-600 transition-all shadow-lg">
            Buy Now
          </button>
          </a>
        </div>
      </div>
    </div>
  );
};

const FlipCardContainer = () => {
  const cards = [
    {
      image: blackTee,
      title: "Black  T-Shirt",
      details: [
        "100% Cotton",
        "Unisex Fit",
        "Available in all sizes",
        "Premium Quality",
      ],
      price: "₹150",
    },
    {
      image: blackTee,
      title: "White  T-Shirt",
      details: [
        "Exclusive Design",
        "Breathable Fabric",
        "Machine Washable",
        "Perfect Fit",
      ],
      price: "₹150",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center items-center bg-[#120c0f] min-h-screen p-4 sm:p-12 w-full">
      {cards.map((card, index) => (
        <FlipCard key={index} {...card} />
      ))}
    </div>
  );
};

export default FlipCardContainer;