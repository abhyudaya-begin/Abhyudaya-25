import React, { useState } from 'react';
import { motion } from 'framer-motion';
import artistsData from './Artist';

// Sample Artists Data (you would typically import from Artists.json)


const ArtistGallery = () => {
 

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900  to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Gallery Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-pink-100 mb-12">
          Featured Artists
        </h1>

        {/* Artist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-14 md:gap-8 lg:gap-10">
          {artistsData.map((artist) => (
            <motion.div 
              key={artist.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="relative group cursor-pointer"
              
            >
              {/* Artist Image */}
              <div className="aspect-[2/3] w-full overflow-hidden rounded-2xl shadow-xl">
                <img 
                  src={artist.link} 
                  alt={artist.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Glassmorphism Artist Name Overlay */}
              {/* Glassmorphism Artist Name Overlay */}
<div className="absolute bottom-0 left-0 right-0 p-4">
  <div className="bg-transparent backdrop-blur-2xl rounded-2xl border border-white/20 shadow-lg p-4 text-center transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
    <h3 className="text-white text-xl md:text-2xl font-semibold tracking-wider drop-shadow-lg animate-pulse relative">
      {artist.name}
      <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-20 rounded-2xl blur-lg group-hover:animate-[shimmer_3s_infinite]"></span>
    </h3>
  </div>
</div>

            </motion.div>
          ))}
        </div>

      
      </div>
    </div>
  );
};

export default ArtistGallery;