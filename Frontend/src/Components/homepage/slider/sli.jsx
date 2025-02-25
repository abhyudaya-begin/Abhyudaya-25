import { useState } from "react";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

export default function Carousel({ slides }) {
  let [current, setCurrent] = useState(0);

  let previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div className="overflow-hidden relative rounded-lg">
      <div
        className={`flex transition ease-out duration-500`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((s, index) => {
          return (
            <img
              key={index}
              src={s}
              className="w-full h-full object-cover rounded-lg"
              alt={`Slide ${index}`}
            />
          );
        })}
      </div>

      <div className="absolute bottom-0 h-full w-full flex justify-between items-center text-white px-10 text-3xl z-10">
        <button onClick={previousSlide} className="absolute left-0 bottom-1/2 transform translate-y-1/2">
          <BsFillArrowLeftCircleFill />
        </button>
        <button onClick={nextSlide} className="absolute right-0 bottom-1/2 transform translate-y-1/2">
          <BsFillArrowRightCircleFill />
        </button>
      </div>

      <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
        {slides.map((s, i) => {
          return (
            <div
              onClick={() => {
                setCurrent(i);
              }}
              key={"circle" + i}
              className={`rounded-full w-5 h-5 cursor-pointer ${
                i === current ? "bg-white" : "bg-gray-500"
              }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}