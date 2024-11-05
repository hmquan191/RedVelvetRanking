document.addEventListener('DOMContentLoaded', () => {
    const leaderboard = document.getElementById('leaderboard');

    // Load songs from the API
    fetch('/api/songs')
        .then(response => response.json())
        .then(songs => {
            songs.forEach(song => {
                const li = document.createElement('li');
                li.textContent = `${song.name} - ${song.album} - ${song.releaseYear}`;
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
