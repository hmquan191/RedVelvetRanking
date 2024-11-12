const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const CARD_GAME_FOLDER_NAME = "RV_CardGame";
const CARD_GAME_DIRECTORY = path.join(process.cwd(), "src", "public", "img", CARD_GAME_FOLDER_NAME);

router.get('/', (req, res) => {
    // Initialize an object to store counts for each member
    const memberImageCounts = {};

    // Read the main folder to get each member's subdirectory
    fs.readdir(CARD_GAME_DIRECTORY, (err, memberFolders) => {
        if (err) {
            console.error("Error reading image directory", err);
            return res.status(500).json({ error: "Cannot read image directory" });
        }

        // Filter only directories (one per member)
        const validMembers = memberFolders.filter((folder) => {
            const folderPath = path.join(CARD_GAME_DIRECTORY, folder);
            return fs.statSync(folderPath).isDirectory();
        });

        // Loop over each member directory to count images
        validMembers.forEach((member) => {
            const memberFolderPath = path.join(CARD_GAME_DIRECTORY, member);

            // Read each member's directory to count images
            const images = fs.readdirSync(memberFolderPath).filter((file) => {
                return file.endsWith('.jpg') || file.endsWith('.png'); // Adjust for your image file types
            });

            memberImageCounts[member] = images.length;
        });

        console.log("Image counts by member:", memberImageCounts);
        res.json(memberImageCounts); // Send the image counts as JSON response
    });
});

module.exports = router;
