const express = require('express');
const path = require('path')
const { spawn } = require('child_process');
const app = express();
const PORT = 3000;
require('dotenv').config()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'test.html'));
});


app.get('/sendMsg', (req, res) => {
    const pythonProcess = spawn('python3', ['script.py']);

    pythonProcess.stdout.on('data', (data) => {
        res.send(data.toString());
    });

    pythonProcess.stderr.on('data', (data) => {
        res.status(500).send(data.toString());
    });
});


app.get('/chat', (req, res) => {
const fetch = require('node-fetch');

const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyChMKb4z3AB5XwbnmsgrcJ7M6vHIbivg7M';

const data = {
  contents: [
    {
      parts: [
        { text: "Apa yang saya tanyakan sebelumnya?" }
      ]
    }
  ]
};

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(responseData => {
    // Handle the response structure
    if (responseData.candidates && responseData.candidates.length > 0) {
      const candidate = responseData.candidates[0];
      const text = candidate.content.parts[0].text;
      const finishReason = candidate.finishReason;
      const safetyRatings = candidate.safetyRatings;

      console.log('Response Text:', text);
      console.log('Finish Reason:', finishReason);
      console.log('Safety Ratings:', safetyRatings);
    } else {
      console.log('No candidates found in the response');
    }

    console.log('Usage Metadata:', responseData.usageMetadata);
    console.log('Model Version:', responseData.modelVersion);
  })
  .catch(error => console.error('Error:', error));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
