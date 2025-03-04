import { motion } from "framer-motion";

const artists = [
  {
    name: "Artist One",
    image:
      "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Artist Two",
    image:
      "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Artist Three",
    image:
      "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Artist Four",
    image:
      "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const ArtistSection = () => {
  return (
    <div className="py-20 bg-gradient-to-b from-black to-[#0f0f0f]">
      <h2 className="text-center text-5xl font-bold text-white mb-16 uppercase tracking-wide">
        Our Artists
      </h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-10"
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {artists.map((artist, index) => (
          <motion.div
            key={index}
            className="relative w-72 h-96 rounded-2xl overflow-hidden shadow-xl cursor-pointer"
            whileHover={{ scale: 1.1, rotateX: 10, rotateY: 10 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <img
              src={artist.image}
              alt={artist.name}
              className="w-full h-full object-cover"
            />
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl font-semibold opacity-0 hover:opacity-100 transition-opacity duration-500"
              whileHover={{ backdropFilter: "blur(10px)" }}
            >
              {artist.name}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ArtistSection;
