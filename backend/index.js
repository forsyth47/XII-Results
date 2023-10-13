const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors());

const directoryPath = path.join(__dirname, 'sites');

app.get('/', (req, res) => {
    fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return res.status(500).json({ error: 'Error reading directory' });
    }
    res.json({ files });
    });
});

app.get('/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(directoryPath, filename);
    console.log(filePath)
    fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
        return res.status(500).json({ error: 'Error reading file' });
    }
    res.send(data);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
