import React, { useEffect, useRef, useState } from "react";
import CountDownCard from "./CountDownCard";

const CountDownTimer = () => {
  const SecondsCardRef = useRef(null);
  const MinutesCardRef = useRef(null);
  const HoursCardRef = useRef(null);
  const DaysCardRef = useRef(null);

  const calculateTimeLeft = () => {
    const targetDate = new Date("April 4, 2025 00:00:00").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());

      SecondsCardRef.current?.classList.toggle("rotate");
      if (timeLeft.seconds === 0) MinutesCardRef.current?.classList.toggle("rotate");
      if (timeLeft.seconds === 0 && timeLeft.minutes === 0) HoursCardRef.current?.classList.toggle("rotate");
      if (timeLeft.seconds === 0 && timeLeft.minutes === 0 && timeLeft.hours === 0) DaysCardRef.current?.classList.toggle("rotate");

    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
      <CountDownCard label="Days" number={timeLeft.days} cardRef={DaysCardRef} />
      <CountDownCard label="Hours" number={timeLeft.hours} cardRef={HoursCardRef} />
      <CountDownCard label="Minutes" number={timeLeft.minutes} cardRef={MinutesCardRef} />
      <CountDownCard label="Seconds" number={timeLeft.seconds} cardRef={SecondsCardRef} />
    </div>
  );
};

export default CountDownTimer;
 