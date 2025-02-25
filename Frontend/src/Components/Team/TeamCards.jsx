import React, { useState } from 'react';
import { FaLinkedin, FaInstagram, FaEnvelope, FaGithub } from 'react-icons/fa';

function TeamCards({ member }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-72 h-96 mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Bottom white card with name and icons */}
      <div className="absolute inset-0 w-full h-full rounded-xl bg-white shadow-lg">
        {/* Name and position section with minimal spacing */}
        <div className="absolute bottom-1 left-0 right-0 px-8 pt-6 group">
          <h3 className="text-2xl font-bold text-gray-800 relative overflow-hidden text-center mb-0
            hover:text-blue-600 transition-colors duration-300
            before:content-[''] before:absolute before:w-full before:h-full 
            before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent
            before:-translate-x-full hover:before:translate-x-full before:transition-transform
            before:duration-700 before:transform group-hover:scale-105">
            {member.name}
          </h3>
          <p className="text-md text-gray-600 transform transition-all duration-300 text-center -mt-1
            group-hover:text-blue-500 group-hover:translate-y-1">
            {member.position}
          </p>
        </div>

        {/* Social handles on right with further reduced padding */}
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col gap-4">
          {member.linkedin && (
            <a 
              href={member.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black-900 hover:text-blue-600 transition-all duration-300 transform hover:scale-110 hover:-translate-x-1"
            >
              <FaLinkedin size={30} />
            </a>
          )}
          {member.insta && (
            <a 
              href={member.insta}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black-900 hover:text-pink-600 transition-all duration-300 transform hover:scale-110 hover:-translate-x-1"
            >
              <FaInstagram size={30} />
            </a>
          )}
          <a 
            href={`mailto:${member.gmail}`}
            className="text-black-900 hover:text-red-600 transition-all duration-300 transform hover:scale-110 hover:-translate-x-1"
          >
            <FaEnvelope size={30} />
          </a>
          <a 
            href={member.github}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-black-900 hover:text-blue-600 transition-all duration-300 transform hover:scale-110 hover:-translate-x-1"
          >
            <FaGithub size={30} />
          </a>
        </div>
      </div>

      {/* Main card with image that slides */}
      <div 
        className={`absolute inset-0 w-full h-full bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform border-2 border-red-600
          ${isHovered ? '-translate-x-[15%] -translate-y-[15%]' : ''}`}
      >
        <div className="relative w-full h-full">
          <img 
            src={member.imgLink} 
            alt={member.name}
            className="w-full h-full object-cover"
          />
          {/* Optional gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>
      </div>
    </div>
  );
}

export default TeamCards; 