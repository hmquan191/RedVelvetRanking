const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const songsRouter = require('./src/routes/songs'); // Adjusted path for routes
const imageCountRouter = require('./src/routes/imageCount');
const cardGameCountRouter = require('./src/routes/CardGameCount');
const fs = require('fs');

dotenv.config();

const app = express();
const port = 5500;

// Middleware to parse JSON bodies and serve static files
app.use(express.json());
app.use(express.static('src/public')); // Serve static files from public directory

// Use the songs router
app.use('/api/songs', songsRouter);
app.use('/api/image-count', imageCountRouter);
app.use('/api/cardGame-count', cardGameCountRouter);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/public', 'index.html'));
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
