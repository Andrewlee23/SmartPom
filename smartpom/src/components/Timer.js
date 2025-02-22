import React, { useState, useEffect } from 'react';
import '../pages/Timerpage.css';
const Timer = ({initialTime, onTimeUp}) => {
    const [remainingTime, setTimeRemaining] = useState(initialTime * 60);
    const [IsActive, setIsActive] = useState(false);

    useEffect(() => {
        if (IsActive) return;

        const timer = setInterval(() => {
            setTimeRemaining(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    onTimeUp();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        return () => clearInterval(timer); 
    }, [IsActive]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
    return (
        <div>
            <h1 className="timer-display">{formatTime(remainingTime)}</h1>
            <div className="button-container">
                <button className="timer-button pause-button" onClick={() => setIsActive(!IsActive)}>
                    {IsActive ? "Resume" : "Pause"}
                </button>
                <button className="timer-button reset-button" onClick={() => setTimeRemaining(initialTime * 60)}>
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Timer;