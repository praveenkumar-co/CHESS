import React, { useEffect, useState } from "react";
import "./Clock.css";

const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000); 
    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds() * 6;
  const minutes = time.getMinutes() * 6;
  // we want hours according to angle 30,60 ,90  .. upto 360  so.we will put our hours button at the same angle 
  const hours = ((time.getHours() % 12) + time.getMinutes() / 60) * 30;
    // const numbers = Array.from({ length: 12 }, (_, i) => i + 1);
    // we are creating an array - > 
    const numbers = Array.from({length:12},(_,i)=>i +1 );
  return (
    <div className="clock">
      {numbers.map((num,i)=>{
        // above role of num is to render on screen and role of i is to correctly work as a index ->
      // for correct 30 ddegree angle ->
      const angle= (i+1) * 30 ;
       return (
          <div
          // this num value will get render on screen 
          key = {num}
            className="clock-number"
            // most important part to rotate the number 
            style={{
              transform: `rotate(${angle}deg) translateY(-130px) rotate(-${angle}deg)`
            }}
            // in order to see the number in screen we use {num}
           >
          {num}
          </div>
        );
      })}
      <div className="hand-hour" style={{ transform: `rotate(${hours}deg)` }} />
      <div className="hand-minute" style={{ transform: `rotate(${minutes}deg)` }} />
      <div className="hand-second" style={{ transform: `rotate(${seconds}deg)` }} />
      <div className="center-dot" />
    </div>
  );
};

export default AnalogClock;
