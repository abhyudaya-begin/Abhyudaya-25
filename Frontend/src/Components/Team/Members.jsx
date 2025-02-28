import React, { useState, useEffect } from 'react';
import TeamCards from './TeamCards';
import teamData from './team.json';
import { FaUsers } from 'react-icons/fa';

const Members = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showQuote, setShowQuote] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide header when scrolling down, show when scrolling up
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

  // Filter team members by year
  const finalYearMembers = teamData.filter(member => member.year === "final");
  const thirdYearMembers = teamData.filter(member => member.year === "third");
  const secondYearMembers = teamData.filter(member => member.year === "second");

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundColor: '#120c0f'
      }}
    >
      <div className="relative">
        {/* Hero Section */}
        <div className={`relative w-full transition-all duration-500 transform ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full opacity-0'
        }`}>
          <div className="bg-transparent text-white">
            <div className="container mx-auto px-4 py-20 text-center">
              <FaUsers className="mx-auto text-6xl mb-6 text-blue-200 animate-bounce" />
              <h1 className="text-5xl font-bold text-center mb-4 animate-fade-in">
                Meet Our Team
              </h1>
              <p className="text-xl text-center text-blue-100 max-w-2xl mx-auto animate-fade-up">
                Dedicated professionals working together to create amazing experiences
              </p>
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className={`relative w-full transition-all duration-500 transform ${
          showQuote ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}>
          <div className="bg-transparent text-white py-4">
            <div className="container mx-auto px-4 text-center">
              <img 
                src="https://vvlelkzbqhcamsmkhteb.supabase.co/storage/v1/object/sign/chandan-project/Screenshot%202025-02-18%20023642.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjaGFuZGFuLXByb2plY3QvU2NyZWVuc2hvdCAyMDI1LTAyLTE4IDAyMzY0Mi5wbmciLCJpYXQiOjE3Mzk4MjcxNDQsImV4cCI6MTg5NzUwNzE0NH0.j-Y34FTdzu8Uf0VWMYgGZaordUOgKxwl3RVZWNXiTEU"
                alt="Team Logo" 
                className="w-32 h-32 mx-auto mb-4 object-contain border-2 border-white rounded-lg"
              />
              <p className="text-2xl italic font-light">
                "Coming together is a beginning, staying together is progress, and working together is success."
              </p>
              <p className="text-sm mt-2 font-medium">– Henry Ford</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative">
          {/* Final Year Section */}
          {finalYearMembers.length > 0 && (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <h2 className="text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent drop-shadow-lg transform hover:scale-105 transition-transform duration-300 font-['Poppins']">
                Final Year
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-20 px-4 sm:px-6 lg:px-8">
                {finalYearMembers.map((person, index) => (
                  <div
                    key={`final-${person.name}`}
                    className="animate-fade-up hover:z-10 p-6"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <TeamCards member={person} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Third Year Section */}
          {thirdYearMembers.length > 0 && (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <h2 className="text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent drop-shadow-lg transform hover:scale-105 transition-transform duration-300 font-['Poppins']">
                Third Year
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-20 px-4 sm:px-6 lg:px-8">
                {thirdYearMembers.map((person, index) => (
                  <div
                    key={`third-${person.name}`}
                    className="animate-fade-up hover:z-10 p-6"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <TeamCards member={person} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Second Year Section */}
          {secondYearMembers.length > 0 && (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <h2 className="text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent drop-shadow-lg transform hover:scale-105 transition-transform duration-300 font-['Poppins']">
                Second Year
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-20 px-4 sm:px-6 lg:px-8">
                {secondYearMembers.map((person, index) => (
                  <div
                    key={`second-${person.name}`}
                    className="animate-fade-up hover:z-10 p-6"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <TeamCards member={person} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Members; 