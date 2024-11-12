const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const RV_PIC_FOLDER_NAME = "RV_PIC";
const RV_PIC_DIRECTORY = path.join(process.cwd(), "src", "public", "img", RV_PIC_FOLDER_NAME);

router.get('/', (req, res) => {
    fs.readdir(RV_PIC_DIRECTORY, (err, files) => {
        if (err) {
            console.error("Error reading image directory", err);
            return res.status(500).json({ error: "Cannot read image directory" });
        }

        const imageCount = files.length;
        console.log(`Number of images fetched ${imageCount}`)
        res.json({ count: imageCount });
    });
});

module.exports = router;
