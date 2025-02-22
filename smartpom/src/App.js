import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import TimerPage from './pages/Timerpage';

const App = () => {
    const [pomodoroSchedule, setPomodoroSchedule] = useState([]); 

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage setPomodoroSchedule={setPomodoroSchedule} />} /> 
                <Route path="/timer" element={<TimerPage pomodoroSchedule={pomodoroSchedule} />} />
            </Routes>
        </Router>
    );
};

export default App;