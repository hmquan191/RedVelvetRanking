// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const path = require('path');
// const Song = require('./src/models/Song'); // Ensure this path matches your Song model file


// const app = express();
// const port = 5500;

// // Route to get the number of images in RV_PIC folder
// const fs = require('fs');
// app.use(express.static(path.join(__dirname, 'public')));


// dotenv.config();



// // Set EJS as the template engine
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'src/views'));

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error(err));

// // Route to render the page with songs
// app.get('/', async (req, res) => {
//     try {
//         const songs = await Song.find(); // Fetch all songs from the database
//         res.render('index', { songs });  // Pass songs to the template
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error retrieving songs');
//     }
// });




// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
