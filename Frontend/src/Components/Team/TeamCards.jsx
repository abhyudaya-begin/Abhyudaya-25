import React, { useState } from 'react';
import { FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

function TeamCards({ member }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-40 h-52 mx-auto flex justify-center items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Bottom white card with name and icons */}
      <div className="absolute inset-0 w-full h-full rounded-lg bg-white flex flex-col justify-center items-center">
        <div className="absolute bottom-1 left-0 right-0 px-3 pt-2 group">
          <h3 className="text-sm font-bold text-gray-800 text-center mb-0 
            hover:text-blue-600 transition-colors duration-300
            before:content-[''] before:absolute before:w-full before:h-full 
            before:-translate-x-full hover:before:translate-x-full before:transition-transform
            before:duration-700 before:transform group-hover:scale-105">
            {member.name}
          </h3>
          <p className="text-xs font-bold text-gray-600 text-center -mt-1 transform transition-all duration-300
            group-hover:text-blue-500 group-hover:translate-y-1">
            {member.position}
          </p>
          
        </div>

        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {member.linkedin && (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
              className="text-black-900 hover:text-blue-600 transition-all duration-300 transform hover:scale-110 hover:-translate-x-1">
              <FaLinkedin size={14} />
            </a>
          )}
          {member.insta && (
            <a href={member.insta} target="_blank" rel="noopener noreferrer"
              className="text-black-900 hover:text-pink-600 transition-all duration-300 transform hover:scale-110 hover:-translate-x-1">
              <FaInstagram size={14} />
            </a>
          )}
          <a href={`mailto:${member.gmail}`}
            className="text-black-900 hover:text-red-600 transition-all duration-300 transform hover:scale-110 hover:-translate-x-1">
            <FaEnvelope size={14} />
          </a>
        </div>
      </div>

      {/* Main card with image */}
      <div 
        className={`absolute inset-0 w-full h-full bg-white rounded-lg overflow-hidden transition-all duration-300 transform
          ${isHovered ? '-translate-x-[15%] -translate-y-[15%]' : ''}`}
      >
        <div className="relative w-full h-full">
          <img 
            src={member.imgLink} 
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default TeamCards;