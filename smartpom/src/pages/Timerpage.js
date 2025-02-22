
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Timer from '../components/Timer';
import './Timerpage.css';

const TimerPage = ({ pomodoroSchedule = [] }) => { 
    const navigate = useNavigate();
    const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
    const [phaseComplete, setPhaseComplete] = useState(false);
    const handlePhaseComplete = () => {
        setPhaseComplete(true);
    };
    useEffect(() => {
        if (phaseComplete) {
            if (currentPhaseIndex < pomodoroSchedule.length - 1) {
                setCurrentPhaseIndex((prev) => prev + 1);
            } else {
                alert("cycle completed!");
                navigate('/');
            }
            setPhaseComplete(false); 
        }
    }, [phaseComplete, currentPhaseIndex, pomodoroSchedule, navigate]);

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
            
        </div>
    );
};

export default TimerPage;