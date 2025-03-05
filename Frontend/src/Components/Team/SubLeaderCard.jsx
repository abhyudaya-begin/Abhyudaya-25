import React from 'react';

function SubLeaderCard({ member, message }) {
  return (
    <div className="max-w-sm">
      <div className="relative w-64 h-[300px] mx-auto mb-4"> {/* Smaller width and height */}
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
            <h3 className="text-xl font-bold text-gray-800 text-center"> {/* Smaller text */}
              {member.name}
            </h3>
            <p className="text-md text-gray-600 text-center mt-1"> {/* Smaller text */}
              {member.position}
            </p>
          </div>
        </div>
      </div>

      {/* Message Section */}
      <div className="bg-white/90 p-4 rounded-lg shadow-lg">
        <p className="text-gray-700 text-center italic text-sm"> {/* Smaller text */}
          {message}
        </p>
      </div>
    </div>
  );
}

export default SubLeaderCard; 