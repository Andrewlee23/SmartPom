import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import "./About.css";

const About = ({}) => {
    const navigate = useNavigate();

    const bing = [
        'AI-Optimized Work & Rest Intervals: Uses past work sessions to adjust future focus times dynamically',
        'Task-Based Adaptation: Suggests session lengths based on task complexity (e.g., coding vs. reading) based on user input',
        'Real-Time Adjustments: If AI detects decreasing focus, it shortens sessions or increases breaks',
        'Progress Insights: Provides reports on work patterns and productivity trends over time',
        'Optional AI-Powered Focus Music: Uses calm background sounds to boost concentration'
    ]
    const listItems = bing.map((bong) => 
        <div>
            <li className="list">- {bong}</li><br></br>
        </div>
    );
    return(
        
            <div>
                <ul>
                 <li><a onClick={() => navigate('/SmartPom')}>Home</a></li>
                 <li><a onClick={() => navigate('/about')}>About</a></li>
                </ul> 
                <h1 className="title">What Is SmartPom</h1>
                <h3>Overview</h3>
                <p>SmartPom is a smart Pomodoro timer that dynamically adjusts work and rest periods based on the user’s focus levels, workload, and past performance. Instead of using the traditional 25/5-minute Pomodoro cycle, it learns from user behavior and tailors time blocks for maximum productivity.</p>
                <h3>Problem Statement</h3>
                <p>Traditional Pomodoro timers assume a one-size-fits-all work-rest ratio, but everyone has different attention spans and energy levels. Some tasks require deeper focus, while others may need shorter sprints. SmartPom personalized focus sessions to fit the user’s natural rhythm.</p>
                <h3>Key Features</h3>
                <ul>
                    {listItems}
                </ul>
            </div>
    );
};


export default About;