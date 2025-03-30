import React from "react";
import sponsorsData from "./SponsorData";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CurrSpons from "./CurrSpons";

const Sponsors = () => {
  return (
    <div className="bg-gradient-to-r from-black via-gray-900">
    <h1 className="text-4xl uppercase font-extrabold text-purple-400 sm:text-5xl text-center p-16 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-200 to-indigo-100 animate-pulse"
      >
        Our Current Sponsors
      </h1>
      {/* <div className="rounded bg-gradient-to-r from-black via-gray-900 p-4 w-full sm:w-[60%] text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 mx-auto">
        <img
          src="https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/GDGoenka.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy9HREdvZW5rYS5qcGciLCJpYXQiOjE3NDE0Mzk2MDYsImV4cCI6MTgzNjA0NzYwNn0.a7lmxIFQnPMJVcrSJoyKJnpDGVpsTsIM6t0WwAbYOQA"
          alt="GD Goenka"
          className="mx-auto rounded  w-full h-auto"
        />
        <h2 className="text-4xl font-bold">GD Goenka</h2>
        <h3 className="text-2xl font-semibold">Titile Sponsor ABH'24</h3>
      </div> */}
     <div className="rounded-lg bg-gradient-to-r from-black to-gray-900 p-2 w-[50%] sm:w-[30%] text-center transition-transform duration-300 hover:scale-105 hover:shadow-md hover:shadow-white mx-auto">
  <img
    src="https://i.postimg.cc/ncVVRq8M/tvs-Apache.jpg"
    alt="Tvs Apache"
    className="mx-auto rounded-md w-full h-auto shadow-sm"
  />
  <h2 className="text-2xl font-bold text-white mt-3">Tvs Apache</h2>
  <h3 className="text-lg font-medium text-gray-300 mt-1">Fest Sponsor</h3>

</div>


      <div className="p-8 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {CurrSpons.map((sponsor, index) => (
          <div
            key={index}
            className="rounded-lg bg-gradient-to-r from-black via-gray-900 to-gray-800 p-4 w-[90%] text-center transition-transform duration-300 hover:scale-105 hover:shadow-md hover:shadow-white mx-auto"
          >
            <LazyLoadImage
              src={sponsor["spon-link"]}
              alt={sponsor.name}
              className="mx-auto rounded aspect-[3/2] mb-2 w-full h-auto object-contain"
            />
            <p>{sponsor.name}</p>
          </div>
        ))}
      </div>








      <h1 className="text-4xl uppercase font-extrabold text-purple-400 sm:text-5xl text-center p-16 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-200 to-indigo-100 animate-pulse"
      >
        Our Previous Sponsors
      </h1>
      {/* <div className="rounded bg-gradient-to-r from-black via-gray-900 p-4 w-full sm:w-[60%] text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 mx-auto">
        <img
          src="https://bmpwmkwijlrnrrywhqsp.supabase.co/storage/v1/object/sign/Sponsors/GDGoenka.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTcG9uc29ycy9HREdvZW5rYS5qcGciLCJpYXQiOjE3NDE0Mzk2MDYsImV4cCI6MTgzNjA0NzYwNn0.a7lmxIFQnPMJVcrSJoyKJnpDGVpsTsIM6t0WwAbYOQA"
          alt="GD Goenka"
          className="mx-auto rounded  w-full h-auto"
        />
        <h2 className="text-4xl font-bold">GD Goenka</h2>
        <h3 className="text-2xl font-semibold">Titile Sponsor ABH'24</h3>
      </div> */}
      <div className="p-8 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {sponsorsData.map((sponsor, index) => (
          <div
            key={index}
            className="rounded-lg bg-gradient-to-r from-black via-gray-900 to-gray-800 p-4 w-[90%] text-center transition-transform duration-300 hover:scale-105 hover:shadow-md hover:shadow-white mx-auto"
          >
            <LazyLoadImage
              src={sponsor["spon-link"]}
              alt={sponsor.name}
              className="mx-auto rounded aspect-[3/2] mb-2 w-full h-auto object-contain"
            />
            <p>{sponsor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsors;
