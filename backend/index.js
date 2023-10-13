const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

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
  const externalUrl = `https://raw.githubusercontent.com/forsyth47/XII-Results/main/backend/sites/${filename}`;

  axios
    .get(externalUrl)
    .then(response => {
        res.send(response.data);
    })
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
