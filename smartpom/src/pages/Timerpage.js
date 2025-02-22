import React from 'react';
import { useNavigate } from 'react-router-dom';
import Timer from '../components/Timer';
import "./Timerpage.css";


const TimerPage = ({ estimatedTime }) => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>SmartPom</h1>
            <Timer initialTime={estimatedTime} onTimeUp={() => alert("Time is up!")} />
            <button onClick={() => navigate('/')}>Go Back</button>
        </div>
    );
};

export default TimerPage;