const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' })); 

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/api/get-time', async (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ error: 'task description is required' });
    }

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4o',
                messages: [{ role: 'user', content: `How long does it take to ${task}? Give the time in minutes only.` }],
                max_tokens: 50
            },
            {
                headers: { Authorization: `Bearer ${OPENAI_API_KEY}` }
            }
        );
        console.log('response:', response.data);
      
        const estimatedTime = response.data.choices[0].message.content.match(/\d+/);
        if (!estimatedTime) {
            return res.status(500).json({ error: 'failed to extract estimated time' });
        }
        // 5/6th of the time is work
        // 1/6th of the time is breaks
        let totalMinutes = parseInt(estimatedTime[0], 10);
        console.log('totalMinutes:', totalMinutes);
        const workDuration = Math.floor((totalMinutes / 6) * 5); 
        const breakDuration = Math.floor(totalMinutes / 6);
        const shortBreak = Math.min(5, breakDuration / 5); 
        const longBreak = Math.max(10, breakDuration);

        let pomodoroSchedule = [];

        for (let i = 1; totalMinutes > 0; i++) {
            let sessionTime = Math.min(25, workDuration); // work session capped at 25 min
            pomodoroSchedule.push({ type: 'work', duration: sessionTime });
            totalMinutes -= sessionTime;

            if (i % 5 === 0) {
                pomodoroSchedule.push({ type: 'long_break', duration: longBreak });
            } else if (totalMinutes > 0) {
                let break1 = Math.max(3, shortBreak) // break min is 3 minutes
                pomodoroSchedule.push({ type: 'short_break', duration: break1 });
            }
        }

        console.log(pomodoroSchedule);
        res.json({ estimatedTime: totalMinutes, pomodoroSchedule });
    } catch (error) {
        console.error('Error:', error?.response?.data || error.message);
        res.status(500).json({ error: 'error fetching estimated time' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));