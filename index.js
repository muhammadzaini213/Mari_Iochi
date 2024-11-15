const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const fs = require('fs')
const app = express();
const PORT = 3000;
require('dotenv').config();

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'test.html'));
});

// Handle the /chat POST request
app.post('/chat', (req, res) => {
const nameInput = req.body.name;

const filePath = `memory/${nameInput}.txt`;
let oldMemory=''
if (fs.existsSync(filePath)) {
  const data = fs.readFileSync(filePath, 'utf8');
  oldMemory=data
} else {
  console.log('File does not exist. Skipping...');
}

console.log(nameInput)
    const chatInput = req.body.chat;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;
const chatMsg = `${nameInput}: ${chatInput}`
    const data = {
        contents: [
            {
                parts: [
                    { text: `${oldMemory}\n${chatMsg}` }
                ]
            }
        ]
    };

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseData => {
        if (responseData.candidates && responseData.candidates.length > 0) {
            const candidate = responseData.candidates[0];
            const text = candidate.content.parts[0].text;
            res.json({ text }); // Send the response text to the frontend
fs.writeFile(`memory/${nameInput}.txt`, `${oldMemory}\n${nameInput}: ${chatInput}\nGemini: ${text}\n`, (err) => {
if (err) throw err;
})
        } else {
            res.json({ text: 'No response from API' });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        res.status(500).json({ text: 'Error processing the request.' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});