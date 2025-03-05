import React from 'react';

function LeaderCard({ member, message }) {
  return (
    <div className="w-full max-w-lg">
      <div className="relative w-full h-[400px] mx-auto mb-4">
        {/* Main card with image and details */}
        <div className="relative w-full h-full bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Image container */}
          <div className="relative w-full h-[75%]">
            <img 
              src={member.imgLink} 
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Name and position container */}
          <div className="absolute bottom-0 left-0 right-0 bg-white p-4">
            <h3 className="text-2xl font-bold text-gray-800 text-center">
              {member.name}
            </h3>
            <p className="text-lg text-gray-600 text-center mt-1">
              {member.position}
            </p>
          </div>
        </div>
      </div>

      {/* Message Section */}
      <div className="bg-white/90 p-6 rounded-lg shadow-lg">
        <p className="text-gray-700 text-center italic text-lg">
          {message}
        </p>
      </div>
    </div>
  );
}

export default LeaderCard; 