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

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Use the songs router
app.use('/api/songs', songsRouter);
app.use('/api/image-count', imageCountRouter);
app.use('/api/cardGame-count', cardGameCountRouter);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/public', 'index.html'));
});


// Read and parse API key, channel ID, and uploads ID from notes.txt
let apiConfig = {};
try {
    const data = fs.readFileSync('notes.txt', 'utf-8');
    data.split('\n').forEach(line => {
        const [key, value] = line.split(': ').map(item => item.trim());
        if (key && value) apiConfig[key.toLowerCase().replace(/\s+/g, '_')] = value;
    });
} catch (error) {
    console.error('Error reading API configuration from file:', error);
}

// Endpoint to send the API config securely
app.get('/api-config', (req, res) => {
    res.json({
        apiKey: apiConfig.api_key,
        channelId: apiConfig.channel_id,
        uploadsId: apiConfig.uploads_id
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
