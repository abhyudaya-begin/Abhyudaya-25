import React, { useState, useEffect } from 'react';

const Countdown = () => {
  // Set your event date here (format: year, month-1, day, hour, minute, second)
  const festivalDate = new Date(2025, 3, 4, 0, 0, 0); 
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [animateSecond, setAnimateSecond] = useState(false);
  const [animateMinute, setAnimateMinute] = useState(false);
  const [animateHour, setAnimateHour] = useState(false);
  const [animateDay, setAnimateDay] = useState(false);

  useEffect(() => {
    let previousSeconds = -1;
    let previousMinutes = -1;
    let previousHours = -1;
    let previousDays = -1;
    
    const calculateTimeLeft = () => {
      const difference = festivalDate - new Date();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        setTimeLeft({ days, hours, minutes, seconds });
        
        // Animate when time units change
        if (seconds !== previousSeconds) {
          setAnimateSecond(true);
          setTimeout(() => setAnimateSecond(false), 800);
          previousSeconds = seconds;
        }
        
        if (minutes !== previousMinutes) {
          setAnimateMinute(true);
          setTimeout(() => setAnimateMinute(false), 800);
          previousMinutes = minutes;
        }
        
        if (hours !== previousHours) {
          setAnimateHour(true);
          setTimeout(() => setAnimateHour(false), 800);
          previousHours = hours;
        }
        
        if (days !== previousDays) {
          setAnimateDay(true);
          setTimeout(() => setAnimateDay(false), 800);
          previousDays = days;
        }
      }
    };
    
    // Initial calculation
    calculateTimeLeft();
    
    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);
    
    // Cleanup
    return () => clearInterval(timer);
  }, []);

  // Helper function for leading zeros
  const formatTime = (time) => {
    return time.toString().padStart(2, '0');
  };

  return (
    <div className="flex  flex-col items-center justify-center text-white px-6 bg-transparent ">
      <div className="w-full max-w-4xl">

      <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white text-center mb-12 animate-pulse">
  Abhyudaya'25 is Live in...
</div>


       
        
        {/* Countdown Timer */}
        <div className="flex justify-center flex-wrap items-center gap-2 sm:gap-0  space-x-1 md:space-x-2">
          {/* Days */}
          <div className="flex flex-col items-center ">
            <div className="relative">
              <div className={`bg-purple-900 bg-opacity-80 backdrop-blur-sm rounded-xl border-2 border-purple-300 border-opacity-70 shadow-lg shadow-purple-500/40 p-4 md:p-6 transition-all duration-700 ease-in-out ${animateDay ? 'scale-110 border-opacity-100' : 'scale-100'}`}>
                <span className=" text-5xl  md:text-6xl lg:text-7xl font-bold text-white">
                  {formatTime(timeLeft.days)}
                </span>
              </div>
              <div className={`absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-xl blur opacity-50 transition-opacity duration-700 ${animateDay ? 'opacity-80' : ''}`}></div>
            </div>
            <div className="mt-2 text-sm md:text-lg font-medium text-white">Days</div>
          </div>
          
          {/* Colon */}
          <div className="hidden sm:flex text-5xl mx-1 md:text-6xl lg:text-7xl font-bold text-white opacity-90 animate-pulse flex items-center self-start mt-4 md:mt-6">:</div>
          
          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className={`bg-indigo-900 bg-opacity-20 backdrop-blur-sm rounded-xl border-2 border-indigo-300 border-opacity-70 shadow-lg shadow-indigo-500/40 p-4 md:p-6 transition-all duration-700 ease-in-out ${animateHour ? 'scale-110 border-opacity-100' : 'scale-100'}`}>
                <span className=" text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                  {formatTime(timeLeft.hours)}
                </span>
              </div>
              <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-xl blur opacity-50 transition-opacity duration-700 ${animateHour ? 'opacity-80' : ''}`}></div>
            </div>
            <div className="mt-2 text-sm md:text-lg font-medium text-white">Hours</div>
          </div>
          
          {/* Colon */}
          <div className="hidden sm:flex text-5xl mx-1 md:text-6xl lg:text-7xl font-bold text-white opacity-90 animate-pulse flex items-center self-start mt-4 md:mt-6">:</div>
          
          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className={`bg-violet-900 bg-opacity-20 backdrop-blur-sm rounded-xl border-2 border-violet-300 border-opacity-70 shadow-lg shadow-violet-500/40 p-4 md:p-6 transition-all duration-700 ease-in-out ${animateMinute ? 'scale-110 border-opacity-100' : 'scale-100'}`}>
                <span className=" text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                  {formatTime(timeLeft.minutes)}
                </span>
              </div>
              <div className={`absolute -inset-1 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-xl blur opacity-50 transition-opacity duration-700 ${animateMinute ? 'opacity-80' : ''}`}></div>
            </div>
            <div className="mt-2 text-sm md:text-lg font-medium text-white">Mins</div>
          </div>
          
          {/* Colon */}
          <div className="hidden sm:flex text-5xl mx-1 md:text-6xl lg:text-7xl font-bold text-white opacity-90 animate-pulse flex items-center self-start mt-4 md:mt-6">:</div>
          
          {/* Seconds */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className={`bg-fuchsia-900 bg-opacity-20 backdrop-blur-sm rounded-xl border-2 border-fuchsia-300 border-opacity-70 shadow-lg shadow-fuchsia-500/40 p-4 md:p-6 transition-all duration-700 ease-in-out ${animateSecond ? 'scale-105 border-opacity-100' : 'scale-100'}`}>
                <span className=" text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                  {formatTime(timeLeft.seconds)}
                </span>
              </div>
              <div className={`absolute -inset-1 bg-gradient-to-r from-fuchsia-400 to-pink-400 rounded-xl blur opacity-50 transition-opacity duration-700 ${animateSecond ? 'opacity-80' : ''}`}></div>
            </div>
            <div className="mt-2 text-sm md:text-lg font-medium text-white">Secs</div>
          </div>
        </div>
        
        
      </div>
    </div>
  );
};

export default Countdown;