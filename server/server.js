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

        const estimatedTime = response.data.choices[0].message.content.match(/\d+/);
        if (!estimatedTime) {
            return res.status(500).json({ error: 'failed to extract estimated time' });
        }

        res.json({ estimatedTime: parseInt(estimatedTime[0], 10) });
    } catch (error) {
        console.error('Error:', error?.response?.data || error.message);
        res.status(500).json({ error: 'error fetching estimated time' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));