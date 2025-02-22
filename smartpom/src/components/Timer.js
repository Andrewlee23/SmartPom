
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/Timerpage.css';

const Timer = ({ initialTime, setPhaseComplete }) => {
    const [remainingTime, setTimeRemaining] = useState(initialTime * 60);
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setTimeRemaining(initialTime * 60);
    }, [initialTime]);

    useEffect(() => {
        if (!isActive) return;
        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    if (setPhaseComplete) setPhaseComplete(true);                                             
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
            <button className="go-back-button" onClick={() => navigate('/')}>Go Back</button>
            <button className="timer-button reset-button" onClick={() => setTimeRemaining(initialTime * 60)}>
                    Reset
                </button>
        </div>
    );
};

export default Timer;