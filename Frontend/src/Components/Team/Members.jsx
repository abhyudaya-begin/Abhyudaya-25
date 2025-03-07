import React, { useState, useEffect } from "react";
import TeamCards from "./TeamCards";
import LeaderCard from "./LeaderCard";
import SubLeaderCard from "./SubLeaderCard";
import leaderData from "./leader.json";
import subleaderData from "./subleader.json";

import teamsData from "./Team";
import Abhyudaya from "../../assets/Logo-images/Abhyudaya.png";

const Members = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsHeaderVisible(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-[#120c0f]">
      <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none">
        <img
          src={Abhyudaya}
          alt="Abhyudaya Logo"
          className="w-[300px] md:w-[400px] lg:w-[500px] object-contain opacity-30"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl  md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x">
            About Us
          </h1>
        </div>

        <div className="flex justify-center ">
          <LeaderCard member={leaderData} />
        </div>

        <div className="flex justify-center mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-60 gap-12 mt-12">
            {subleaderData.map((leader, index) => (
              <SubLeaderCard key={index} faculty={leader} />
            ))}
          </div>
        </div>

        <div className="border mt-8"></div>
        <h2 className="text-3xl md:text-5xl mt-24  font-bold text-white text-center mb-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-pulse">
          Team Abhyudaya
        </h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 min-[520px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-15 sm:gap-15">
          {teamsData.map((person, index) => (
            <div
              key={index}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <TeamCards member={person} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Members;
