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
    const itemWidth = 250; // Width + gap
    
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