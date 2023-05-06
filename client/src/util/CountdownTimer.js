import React, { useState, useEffect } from 'react';

const CountdownTimer = ({onButtonClick}) => {
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);
  useEffect(() => {
   if(timeLeft === 0) {
     alert('시간이 초과되었습니다.');
     onButtonClick();
   }
  },[timeLeft,onButtonClick]);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds} left
           </div>
    );
  };

export default CountdownTimer;