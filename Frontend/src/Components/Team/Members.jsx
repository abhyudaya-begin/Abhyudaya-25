import React, { useState, useEffect } from 'react';
import TeamCards from './TeamCards';
import LeaderCard from './LeaderCard';
import SubLeaderCard from './SubLeaderCard';
import leaderData from './leader.json';
import subleaderData from './subleader.json';
import headmemberData from './headmember.json';
import techTeamData from './techTeam.json';
import otherMemberData from './OtherMember.json';
import Abhyudaya from "../../assets/Logo-images/Abhyudaya.png"

const Members = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showQuote, setShowQuote] = useState(false);

  // Add console logging for techTeam data
  useEffect(() => {
    console.log('Tech Team Data:', techTeamData);
  }, []);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        setIsHeaderVisible(false);
        setShowQuote(true);
      } else {
        setIsHeaderVisible(true);
        setShowQuote(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-[#120c0f] overflow-hidden">
      {/* Main container */}
      <div className="relative w-full">
        {/* Fixed Background Logo Container */}
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none">
          <div className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[500px] aspect-square">
            <img 
              src={Abhyudaya} 
              alt="Abhyudaya Logo" 
              className="w-full h-full object-contain opacity-20"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          <div className="container mx-auto px-4 py-12 flex flex-col items-center">
            {/* Team Heading */}
            <div className="w-full text-center mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider">
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient-x">
                  Team Abhyudaya
                </span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Leader Section */}
            <div className="flex justify-center w-full max-w-lg mx-auto">
              <LeaderCard 
                member={leaderData}
                message="As the team leader, I am committed to fostering innovation and collaboration. Together, we strive to create impactful solutions and drive excellence in everything we do."
              />
            </div>

            {/* Sub-Leaders Section */}
            <div className="flex flex-col md:flex-row justify-center gap-8 mt-16">
              {subleaderData.map((leader, index) => (
                <div className="w-full md:w-3/4 lg:w-auto" key={leader.name}>
                  <SubLeaderCard 
                    member={leader}
                    message="Working together to achieve excellence and inspire innovation in our team."
                  />
                </div>
              ))}
            </div>

            {/* Head Members Section */}
            <div className="mt-20 w-full">
              <h2 className="text-3xl font-extrabold tracking-wider text-white text-center mb-12">Head Members</h2>
              <div className="flex flex-col md:flex-row justify-center gap-8 flex-wrap">
                {headmemberData.map((person, index) => (
                  <div
                    key={person.name}
                    className="animate-fade-up w-full md:w-3/4 lg:w-auto"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <TeamCards member={person} />
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Team Section */}
            <div className="mt-20 w-full">
            <h1 class=" text-center mb-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient-x text-4xl font-bold">
                 Tech Team</h1>
              {/* <h2 className="text-3xl font-extrabold tracking-wider text-white text-center mb-12">Technical Team</h2> */}
              <div className="flex flex-col md:flex-row justify-center gap-8 flex-wrap">
                {techTeamData && techTeamData.length > 0 ? (
                  techTeamData.map((person, index) => {
                    console.log('Rendering tech team member:', person);
                    return (
                      <div
                        key={person.name}
                        className="animate-fade-up w-full md:w-3/4 lg:w-auto"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <TeamCards member={person} />
                      </div>
                    );
                  })
                ) : (
                  <p className="text-white text-center">No technical team members found.</p>
                )}
              </div>
            </div>

            {/* Other Members Section */}
            <div className="mt-20 w-full">
              <h2 className="text-3xl font-extrabold tracking-wider text-white text-center mb-12">Team Members</h2>
              <div className="flex flex-col md:flex-row justify-center gap-8 flex-wrap">
                {otherMemberData.map((person, index) => (
                  <div
                    key={person.name}
                    className="animate-fade-up w-full md:w-3/4 lg:w-auto"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <TeamCards member={person} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  {/**/  }
};

export default Members; 