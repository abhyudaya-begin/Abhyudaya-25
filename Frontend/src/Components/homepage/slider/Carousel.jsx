import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

export default function Carousel({ slides }) {
  const [current, setCurrent] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // Auto change every 4 sec
    return () => clearInterval(interval);
  }, [current]);

  const previousSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Swipe handlers for mobile
  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: previousSlide,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <>
      <div className="relative flex w-full overflow-hidden rounded-xl shadow-lg">
        <img
          key={current}
          src={slides[current]}
          className="w-full h-full object-cover rounded-xl"
          alt={`Slide ${current}`}
        />

        {/* Navigation Buttons */}
        <button
          onClick={previousSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:scale-110 transition"
        >
          <BsFillArrowLeftCircleFill />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:scale-110 transition"
        >
          <BsFillArrowRightCircleFill />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="w-full flex justify-center gap-3 mt-2">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              i === current ? "bg-blue-600 scale-125" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </>
  );
}
