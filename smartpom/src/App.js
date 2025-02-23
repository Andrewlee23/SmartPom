import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import TimerPage from './pages/Timerpage';
import AboutPage from './pages/About';

const App = () => {
    const [pomodoroSchedule, setPomodoroSchedule] = useState([]); 

    return (
        <Router>
            <Routes>
                <Route path="/SmartPom" element={<HomePage setPomodoroSchedule={setPomodoroSchedule} />} /> 
                <Route path="/timer" element={<TimerPage pomodoroSchedule={pomodoroSchedule} />} />
                <Route path="/about" element={<AboutPage />}/>
            </Routes>
        </Router>
    );
};

export default App;