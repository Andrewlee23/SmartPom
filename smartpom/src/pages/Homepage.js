import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import "./Homepage.css";

const Homepage = ({ setPomodoroSchedule }) => {
    const [task, setTask] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!task) return;
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/get-time', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task }),
            });

            const data = await response.json();

            if (data.pomodoroSchedule && data.pomodoroSchedule.length > 0) {  
                setPomodoroSchedule(data.pomodoroSchedule);
                console.log('Pomodoro schedule:', data.pomodoroSchedule);
                navigate('/timer');
            } else {
                alert('Failed to get Pomodoro schedule.');
            }
        } catch (error) {
            console.error('Error fetching time:', error);
            alert('Error fetching Pomodoro schedule.');
        }
        setLoading(false);
    };
    return(
            <div>
                <h1 className="title">SmartPom</h1>
                <label className="boxLabel">What Are We Working On Today?</label>
                <input
                className="promptBox"
                type="text"
                placeholder="Input Prompt"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
                <button onClick={handleSubmit}>Start</button>
            </div>
        
    );
};


export default Homepage;