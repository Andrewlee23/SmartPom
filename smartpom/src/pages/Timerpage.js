import React from 'react';
import { useNavigate } from 'react-router-dom';
import Timer from '../components/Timer';
import './Timerpage.css';

const TimerPage = ({ estimatedTime }) => {

    return (
        <div className="timer-page">
            <h1 className="timer-header">SmartPom</h1>
            <Timer initialTime={estimatedTime} onTimeUp={() => alert("Time is up!")} />

        </div>
    );
};

export default TimerPage;