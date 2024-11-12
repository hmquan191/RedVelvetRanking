
// document.addEventListener('DOMContentLoaded', () => {
//     const leaderboard = document.getElementById('leaderboard');

//     // Load songs from the API
//     fetch('/api/songs')
//         .then(response => response.json())
//         .then(songs => {
//             songs.forEach(song => {
//                 const li = document.createElement('li');
//                 li.innerHTML = `
//                     <div>${song.name}</div>
//                     <div>${song.album}</div>
//                     <div>${song.releaseYear}</div>
//                 `;
//                 leaderboard.appendChild(li);
//             });
//         })
//         .catch(err => console.error(err));

//     // Load songs from CSV
//     fetch('/api/songs/load', { method: 'POST' })
//         .then(response => response.json())
//         .then(data => console.log(data.message))
//         .catch(err => console.error(err));
// });


document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.spotify-carousel');
    const items = document.querySelectorAll('.spotify-item');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    
    let currentIndex = 0;
    const itemWidth = 350; // Width + gap
    
    // Set initial position
    updateCarousel();
    
    // Auto-scroll
    let autoScrollInterval = setInterval(nextSlide, 4000);
    
    // Reset interval on user interaction
    function resetInterval() {
        clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(nextSlide, 4000);
    }
    
    function updateCarousel() {
        const offset = -currentIndex * itemWidth;
        carousel.style.transform = `translateX(${offset}px)`;
        
        // Update active states
        items.forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    }
    
    // Event Listeners
    nextButton.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
    
    prevButton.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });
    
    // Pause auto-scroll on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(nextSlide, 5000);
    });
});



document.addEventListener('DOMContentLoaded', () => {
    

    const generateButton = document.getElementById('generateButton');
    const luckyCard = document.getElementById('luckyCard');


    let numberPicture;

    fetch('/api/image-count')
    .then(response => response.json())
    .then(data => {
        numberPicture = data.count;
        console.log(`Fetched pictures in RV_PIC folder: ${numberPicture}`);
    })
    .catch(err => console.error("Failed to retrieve image count:", err));


    generateButton.addEventListener('click', () => {
        // Generate a random number between 1 and numberPicture
        const randomNumber = Math.floor(Math.random() * numberPicture) + 1;
        const randomImagePath = `./img/RV_PIC/${randomNumber}.jpg`;

        // Set the image source
        luckyCard.src = randomImagePath;
        luckyCard.style.display = "inline-block";
        console.log(`Card no.${randomNumber} generated successfully!`);

        // Add error handling if the image doesn't load
        luckyCard.onerror = () => {
            console.error(`Image not found: ${randomImagePath}`);
            luckyCard.src = ''; // Clear the src to avoid showing a broken image icon
            luckyCard.alt = "Image not available"; // Display this message if the image is missing
            luckyCard.style.display = "none"; // Hide the image if it fails to load
        };
    });
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/cardGame-count')
        .then(response => response.json())
        .then(counts => {
            console.log("Card game image counts:", counts);

            // Example: Set up slot machine with these counts
            document.getElementById("slot-machine").addEventListener("click", function() {


                const members = ["irene", "joy", "seulgi", "wendy", "yeri"];
                members.forEach(member => {
                    const randomNum = Math.floor(Math.random() * counts[member]) + 1; // Use count from API
                    document.getElementById(`${member}-slot`).src = `img/RV_CardGame/${member}/${randomNum}_${member}.jpg`;
                    console.log('\n');
                    console.log(`img/RV_CardGame/${member}/${randomNum}_${member}.jpg generated`);
                });


                
                const phrases = [
                    "Team of the Year",
                    "Team of the Season",
                    "Dream Team",
                    "Squad Goals",
                    "Ultimate Formation",
                    "Power Up!",
                    "Legendary Team",
                    "Perfect Squad"
                ];
                const randomPhraseIndex = Math.floor(Math.random()*phrases.length);
                console.log(`random phrase no.${randomPhraseIndex} generated`);
                const randomPhrase = phrases[randomPhraseIndex];
                document.querySelector(".small-text-squad").innerText = randomPhrase;
            });
        })
        .catch(err => console.error("Failed to retrieve card game counts:", err));
});

const videoSection = document.querySelector('.video-section');
const videoContainer = document.querySelector('.video-container');
const loader = document.querySelector('.loader');

// Fetch API configuration from the server
fetch('/api-config')
    .then(res => res.json())
    .then(config => {
        const { apiKey, uploadsId } = config; // Destructure to get apiKey and uploadsId
        const youtubeApiUrl = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${uploadsId}&key=${apiKey}`;

        return fetch(youtubeApiUrl);
    })
    .then(res => res.json())
    .then(data => {

        if (loader) loader.style.display = 'none';

        // Display each video
        data.items.forEach((item) => {
            const videoId = item.snippet.resourceId.videoId;
            const title = item.snippet.title;
            const thumbnailUrl = item.snippet.thumbnails.medium.url;

            // Create a link element for each video
            const videoLink = document.createElement('a');
            videoLink.href = `https://www.youtube.com/watch?v=${videoId}`;
            videoLink.target = '_blank';
            videoLink.classList.add('yt-video');

            videoLink.innerHTML = `
                <img src="${thumbnailUrl}" alt="${title}" class="video-thumbnail">
                <p class="video-title">${title}</p>
            `;

            // Append to the container
            videoContainer.appendChild(videoLink);
        });
    })
    .catch(error => {
        console.error('Error fetching videos:', error);
        videoSection.innerHTML = '<p class="error-message">Failed to load videos. Please try again later.</p>';
});



fetch('https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=1cb3df3476a3bcb17c1baa6259fd23de&artist=Red+Velvet&album=%E2%80%98The+ReVe+Festival%E2%80%99+Finale&format=json')
    .then(response => response.json())
    .then(data => {
        console.log('Album information:', data);
    })
    .catch(error => {
        console.error('Error fetching album information:', error);
});


// Album playcount
const albums = [
    'https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=1cb3df3476a3bcb17c1baa6259fd23de&artist=Red+Velvet&album=%E2%80%98The+ReVe+Festival%E2%80%99+Finale&format=json',
    'https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=1cb3df3476a3bcb17c1baa6259fd23de&artist=Red+Velvet&album=The+Perfect+Red+Velvet+-+The+2nd+Album+Repackage&format=json',
    'https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=1cb3df3476a3bcb17c1baa6259fd23de&artist=Red+Velvet&album=Russian+Roulette+-+The+3rd+Mini+Album&format=json',
    'https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=1cb3df3476a3bcb17c1baa6259fd23de&artist=Red+Velvet&album=Perfect+Velvet+-+The+2nd+Album&format=json',
    'https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=1cb3df3476a3bcb17c1baa6259fd23de&artist=Red+Velvet&album=The+Red+Summer+-+Summer+Mini+Album&format=json',
    'https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=1cb3df3476a3bcb17c1baa6259fd23de&artist=Red+Velvet&album=The+Red+-+The+1st+Album&format=json',
    'https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=1cb3df3476a3bcb17c1baa6259fd23de&artist=Red+Velvet&album=%E2%80%98The+ReVe+Festival+2022+-+Feel+My+Rhythm%E2%80%99&format=json',
    'https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=1cb3df3476a3bcb17c1baa6259fd23de&artist=Red+Velvet&album=Queendom+-+The+6th+Mini+Album&format=json',
    'https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=1cb3df3476a3bcb17c1baa6259fd23de&artist=Red+Velvet&album=Summer+Magic+-+Summer+Mini+Album&format=json',
    'https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=1cb3df3476a3bcb17c1baa6259fd23de&artist=Red+Velvet&album=%E2%80%98The+ReVe+Festival+2022+-+Birthday%E2%80%99&format=json',
    'https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=1cb3df3476a3bcb17c1baa6259fd23de&artist=Red+Velvet&album=Chill+Kill+-+The+3rd+Album&format=json',
];

async function fetchAlbumData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return {
            name: data.album.name,
            playCount: data.album.playcount,
            imageUrl: data.album.image.find(img => img.size === "extralarge")['#text'],
        };
    } catch (error) {
        console.error("Error fetching album data:", error);
    }
}

async function loadLeaderboard() {
    const leaderboardData = await Promise.all(albums.map(url => fetchAlbumData(url)));

    // Sort by play count
    leaderboardData.sort((a, b) => b.playCount - a.playCount);

    // Render leaderboard
    renderLeaderboard(leaderboardData);
}

function renderLeaderboard(data) {
    const leaderboardContainer = document.getElementById('leaderboard');
    leaderboardContainer.innerHTML = ''; // Clear existing leaderboard before rendering

    data.forEach((album, index) => {
        const albumEntry = document.createElement('li');
        albumEntry.classList.add('album-entry');

        albumEntry.innerHTML = `
            <div class="rank">${index + 1}</div>
            <div class="album-name">${album.name}</a></div>
            <div class="play-count">${album.playCount}</div>
        `;

        leaderboardContainer.appendChild(albumEntry);
    });
}

// Initialize the leaderboard when the page loads
window.onload = loadLeaderboard;