import React from "react";
const CountDownCard = ({ label, number }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40 bg-gray-700 shadow-md rounded-lg flex justify-center items-center text-8xl text-pink-400">
        <span>{number}</span>
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gray-800 opacity-35"></div>
      </div>
      <div className="text-center pt-4 uppercase text-lg tracking-wide text-gray-400">{label}</div>
    </div>
  );
};
export default CountDownCard;