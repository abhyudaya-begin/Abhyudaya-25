import React, { useEffect, useRef, useState } from 'react';
import CountDownCard from './CountDownCard';

const CountDownTimer = () => {
  // Card refs
  const SecondsCardRef = useRef(null);
  const MinutesCardRef = useRef(null);
  const HoursCardRef = useRef(null);
  const DaysCardRef = useRef(null);

  // Target date (April 6, 2025)
  const targetDate = new Date('2025-04-06T00:00:00').getTime();

  // State
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.total <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  function calculateTimeLeft(targetDate) {
    const now = new Date().getTime();
    const difference = targetDate - now;

    const timeLeft = {
      total: difference,
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };

    return timeLeft;
  }
/*
  useEffect(() => {
    if (timeLeft.seconds > 0) {
      SecondsCardRef.current.classList.toggle('rotate');
    }
  }, [timeLeft.seconds]);

  useEffect(() => {
    if (timeLeft.minutes > 0) {
      MinutesCardRef.current.classList.toggle('rotate');
    }
  }, [timeLeft.minutes]);

  useEffect(() => {
    if (timeLeft.hours > 0) {
      HoursCardRef.current.classList.toggle('rotate');
    }
  }, [timeLeft.hours]);

  useEffect(() => {
    if (timeLeft.days > 0) {
      DaysCardRef.current.classList.toggle('rotate');
    }
  }, [timeLeft.days]);
*/
  return (
    <div className="countdown__container">
      <CountDownCard
        label="days"
        number={timeLeft.days}
        cardRef={DaysCardRef}
      />
      <CountDownCard
        label="hours"
        number={timeLeft.hours}
        cardRef={HoursCardRef}
      />
      <CountDownCard
        label="minutes"
        number={timeLeft.minutes}
        cardRef={MinutesCardRef}
      />
      <CountDownCard
        label="seconds"
        number={timeLeft.seconds}
        cardRef={SecondsCardRef}
      />
    </div>
  );
};

export default CountDownTimer;