import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import TimerPage from './pages/Timerpage';

const App = () => {
    const [estimatedTime, setEstimatedTime] = useState(0);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage setEstimatedTime={setEstimatedTime} />} />
                <Route path="/timer" element={<TimerPage estimatedTime={estimatedTime} />} />
            </Routes>
        </Router>
    );
};

export default App;