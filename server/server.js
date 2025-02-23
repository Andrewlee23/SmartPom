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
                messages: [
                    { role: 'system', content: "You are an expert at estimating task durations." },
                    {
                        role: 'user',
                        content: `Estimate how long it would take for an average person to complete the following task: "${task}". 
                        Provide your answer in minutes, and ensure the time is realistic based on common productivity levels.
                        If the task is complex, assume the user is focused and working efficiently.
                        Ensure your answer is a reasonable estimate and between 5 minutes to 300 minutes (5 hours max). 
                        Do NOT return anything except the estimated time in minutes as a number.`
                    }
                ],
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
        totalMinutes = Math.max(5, Math.min(totalMinutes, 300));
         
        const breakDuration = Math.floor(totalMinutes / 6);
        const shortBreak = Math.min(5, breakDuration / 2); 
        const longBreak = Math.max(10, breakDuration);
        const maxWorkSession = 35;  // maximum duration of a single work session 
        const minWorkSession = 20; // minimum duration of a single work session 

        let pomodoroSchedule = [];
        let remainingMinutes = totalMinutes;
        while (remainingMinutes > 0) {
            let workDuration = Math.min(remainingMinutes, maxWorkSession);
            workDuration = Math.max(workDuration, minWorkSession);

            pomodoroSchedule.push({ type: 'work', duration: workDuration });
            remainingMinutes -= workDuration;

            if (remainingMinutes <= 0) break;

            if (pomodoroSchedule.length % 4 === 0) {
                pomodoroSchedule.push({ type: 'long_break', duration: longBreak });
            } else {
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