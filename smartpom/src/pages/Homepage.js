import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import "./Homepage.css";

const Homepage = ({ setEstimatedTime }) => {
    const [task] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async () => {
        if (!task) return;
        
        try {
            const response = await fetch('http://localhost:5000/api/get-time', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task }),
            });
            const data = await response.json();
            
            if (data.estimatedTime) {
                setEstimatedTime(data.estimatedTime);
                navigate('/timer');
            } else {
                alert('failed to get time estimate.');
            }
        } catch (error) {
            console.error('error fetching estimated time:', error);
        }
    };
    return(
            <div>
                <h1 className="title">SmartPom</h1>
                <label className="boxLabel">What Are We Working On Today?</label>
                <input className="promptBox" type="text" placeholder="Input Prompt"></input>
                <button>Start!</button>
            </div>
        
    );
};


export default Homepage;