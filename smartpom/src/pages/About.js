import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import "./About.css";

const About = ({}) => {
    const navigate = useNavigate();

    return(
            <div>
                 <ul>
                 <li><a onClick={() => navigate('/')}>Home</a></li>
                 <li><a onClick={() => navigate('/about')}>About</a></li>
                </ul> 
                <h1 className="title">What Is SmartPom</h1>
            </div>
    );
};


export default About;