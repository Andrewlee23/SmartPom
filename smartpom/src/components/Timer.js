import React, { useState, useEffect } from 'react';

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
    }, [isRunning]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };


}

export default Timer; 