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
    <div
      {...handlers}
      className="relative flex w-[100%] overflow-hidden rounded-xl shadow-lg"
    >
      <AnimatePresence>
        <motion.img
          key={current}
          src={slides[current]}
          className="w-full h-[50vh] sm:h-[60vh] object-cover rounded-xl"
          alt={`Slide ${current}`}
          initial={{ x: 0}}
          animate={{ x: 0 }}
          exit={{ x: 1000}}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={previousSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:scale-110 transition"
      >
        <BsFillArrowLeftCircleFill />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:scale-110 transition"
      >
        <BsFillArrowRightCircleFill />
      </button>

      {/* Dots Indicator */}
    </div>
      <div className=" w-full flex justify-center gap-3">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-4 h-4 rounded-full cursor-pointer transition ${
              i === current ? "bg-white scale-125" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
      
      </>
  );
}
