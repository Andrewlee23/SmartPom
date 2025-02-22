import React, { useState, useEffect } from 'react';
import '../pages/Timerpage.css';

const Timer = ({ initialTime, onTimeUp }) => {
    const [remainingTime, setTimeRemaining] = useState(initialTime * 60);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        setTimeRemaining(initialTime * 60);
    }, [initialTime]);

    useEffect(() => {
        if (!isActive) return;
        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    if (onTimeUp) onTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [isActive]);

    return (
        <div>
            <h1 className="timer-display">{`${Math.floor(remainingTime / 60)}:${remainingTime % 60 < 10 ? '0' : ''}${remainingTime % 60}`}</h1>
            <button className="timer-button" onClick={() => setIsActive(!isActive)}>
                {isActive ? "Pause" : "Start"}
            </button>
        </div>
    );
};

export default Timer;