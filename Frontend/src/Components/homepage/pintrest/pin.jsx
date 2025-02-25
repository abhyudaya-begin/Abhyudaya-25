import React from "react";

const Pin = ({ photoUrl, description }) => {
  return (
    <div className="relative">
      <img src={photoUrl} alt={description} className="w-full h-auto" />
      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center p-2">
        {description}
      </div>
    </div>
  );
};

export default Pin;