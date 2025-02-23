
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
            console.log('Phase completed:', pomodoroSchedule[currentPhaseIndex].type);
            setPhaseComplete(false);
            if (currentPhaseIndex < pomodoroSchedule.length - 1) {
                setCurrentPhaseIndex((prev) => prev + 1);
            } else {
                alert("cycle completed!");
                navigate('/');
            }
            
        }
    }, [phaseComplete, currentPhaseIndex, pomodoroSchedule, navigate]);

    return (
        <div className="timer-page">
            <h1 className="timer-header">SmartPom</h1>
            {pomodoroSchedule.length > 0 ? (
                <div>
                    <h1 className="timer-status">{pomodoroSchedule[currentPhaseIndex].type.replace('_', ' ').toUpperCase()}</h1>

                    <Timer
                        initialTime={pomodoroSchedule[currentPhaseIndex].duration}
                        setPhaseComplete={handlePhaseComplete}  
                    />
                </div>
            ) : (
                <p>Loading...</p>
            )}
            
        </div>
    );
};

export default TimerPage;