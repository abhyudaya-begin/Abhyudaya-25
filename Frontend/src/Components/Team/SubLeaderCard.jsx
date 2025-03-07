import React from 'react';

function SubLeaderCard({ faculty }) {
  return (
    <div className="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden text-center">
      {/* Image Section */}
      <img
  src={faculty.imgLink}
  alt={faculty.name}
  loading="lazy" 
  className="w-full h-64 object-cover  hover:scale-105 transition duration-300 ease-in-out"
/>


      {/* Name and Position Section */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{faculty.name}</h3> {/* Name */}
        <p className="text-md font-bold text-gray-600">{faculty.position}</p> {/* Position */}
      </div>
    </div>
  );
}

export default SubLeaderCard;
