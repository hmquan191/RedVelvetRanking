
document.addEventListener('DOMContentLoaded', () => {
    const leaderboard = document.getElementById('leaderboard');

    // Load songs from the API
    fetch('/api/songs')
        .then(response => response.json())
        .then(songs => {
            songs.forEach(song => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div>${song.name}</div>
                    <div>${song.album}</div>
                    <div>${song.releaseYear}</div>
                `;
                leaderboard.appendChild(li);
            });
        })
        .catch(err => console.error(err));

    // Load songs from CSV
    fetch('/api/songs/load', { method: 'POST' })
        .then(response => response.json())
        .then(data => console.log(data.message))
        .catch(err => console.error(err));
});


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
    
    // comment lai lat sua

    // const numberPicture = getPostLength();
    // console.log(`Number of picture in RV_PIC folder: ${numberPicture}`);

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

