const express = require('express');
const { spawn } = require('child_process');
const app = express();
const PORT = 3000;

app.get('/run-python', (req, res) => {
    const pythonProcess = spawn('python3', ['script.py']);

    pythonProcess.stdout.on('data', (data) => {
        res.send(data.toString());
    });

    pythonProcess.stderr.on('data', (data) => {
        res.status(500).send(data.toString());
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
