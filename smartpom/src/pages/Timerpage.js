
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Timer from '../components/Timer';
import './Timerpage.css';

const TimerPage = ({ pomodoroSchedule }) => {
    const navigate = useNavigate();
    const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);

    const handlePhaseComplete = () => {
        if (currentPhaseIndex < pomodoroSchedule.length - 1) {
            setCurrentPhaseIndex((prev) => prev + 1);
        } else {
            alert("Pomodoro cycle completed!");
            navigate('/');
        }
    };

    return (
        <div className="timer-page">
            <h1 className="timer-header">SmartPom</h1>
            {pomodoroSchedule.length > 0 ? (
                <div>
                    <h2>{pomodoroSchedule[currentPhaseIndex].type.replace('_', ' ').toUpperCase()}</h2>
                    <Timer initialTime={pomodoroSchedule[currentPhaseIndex].duration} onTimeUp={handlePhaseComplete} />
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <button className="go-back-button" onClick={() => navigate('/')}>Go Back</button>
        </div>
    );
};

export default TimerPage;