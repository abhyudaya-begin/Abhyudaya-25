import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import CountUp from "react-countup";

const statsData = [
  { value: 50, label: "Institutes", suffix: "+" },
  { value: 4, label: "Prize Pool", suffix: "L+" },
  { value: 45, label: "Events", suffix: "+" },
  { value: 45, label: "Footfall", suffix: "K+" },
];

export default function Stats() {
  const statsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, [controls]);

  return (
    <div className="relative text-center w-full max-w-[90vw] sm:max-w-[85vw] md:max-w-[80vw] rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 bg-gradient-to-r from-[#2E1A47] via-[#3A1C71] to-[#D76D77] text-white">
      {/* About Section */}
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-6 text-white drop-shadow-lg">
        About
      </h2>
      <p className="max-w-4xl mx-auto text-base sm:text-lg text-gray-200 leading-relaxed">
        Abhyudaya, the annual Art, Cultural, and Literary fest of Madan Mohan
        Malaviya University of Technology, Gorakhpur, is a vibrant confluence of
        creativity and passion. It is where art breathes, culture thrives, and
        literature resonates, crafting unforgettable experiences.
      </p>
      <p className="max-w-4xl mx-auto text-base sm:text-lg text-gray-200 leading-relaxed mt-6">
        This year, Abhyudaya '25 unfold it's theme "An Enigmatic Ensemble", a
        fusion of colors, rhythms, and stories. This multi-faceted carnival of
        boundless energy and artistic brilliance invites you to immerse yourself
        in a spectacle of music, dance, and literature, crafting moments that
        will echo far beyond the final curtain call.
      </p>

      {/* Stats Section */}
      <h2 className="text-3xl sm:text-4xl font-extrabold mt-10 sm:mt-12 text-white drop-shadow-lg">
        STATS
      </h2>
      <div
        ref={statsRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mt-6 sm:mt-8 text-white font-bold text-4xl sm:text-5xl"
      >
        {statsData.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg border border-white/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <motion.span
              className="text-5xl sm:text-6xl font-extrabold"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.4 }}
            >
              {isVisible ? (
                <CountUp start={0} end={stat.value} duration={2} />
              ) : (
                "0"
              )}
              {stat.suffix}
            </motion.span>
            <p className="text-base sm:text-lg font-medium text-gray-200 mt-1 sm:mt-2">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
