const express = require('express');
const router = express.Router();
const Song = require('../models/Song');
const fs = require('fs');
const csv = require('csv-parser');

// Load songs from CSV and insert into MongoDB
router.post('/load', (req, res) => {
    const results = [];
    fs.createReadStream('songs.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            try {
                await Song.deleteMany({}); // Clear existing songs before loading new data
                await Song.insertMany(results);
                res.status(200).json({ message: 'Songs loaded successfully!' });
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
});

// Get all songs
router.get('/', async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
