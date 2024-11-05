const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    name: { type: String, required: true },
    album: { type: String, required: true },
    releaseYear: { type: Number, required: true }
});

module.exports = mongoose.model('Song', songSchema);
