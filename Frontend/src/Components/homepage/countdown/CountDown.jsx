import React from "react";
import CountDownTimer from "./CountDownTimer";


const CountDown = () => {
  return (
    < div className="bg-[#120c0f]  text-white h-screen w-full flex flex-col justify-center items-center" >
      
        <main className="text-center pb-12">
          <h2 className="text-[45px]">ABHYUDAYA COMING </h2>
          <CountDownTimer />
        </main>
      
    </div>
  );
}

export default CountDown;