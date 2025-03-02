import React from 'react';

const FacultyCard = ({ member }) => {
  return (
    <div className="relative w-80 h-96 bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Image Container - 80% height */}
      <div className="w-full h-[80%] p-4">
        <img 
          src={member.imgLink} 
          alt={member.name}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* Content Container - 20% height */}
      <div className="w-full h-[20%] flex flex-col justify-center items-center bg-white p-4">
        <h3 className="text-xl font-bold text-gray-800 text-center">{member.name}</h3>
        <p className="text-base text-gray-600 text-center">{member.position}</p>
      </div>
    </div>
  );
};

export default FacultyCard; 