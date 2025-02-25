function getStarIcon() {
    const chance = Math.random();
    const starDistribution = [
        [0.05, '•'],
        [0.2, '*'],
        [1, '.']
    ];
    return starDistribution.find(dist => chance < dist[0])[1];
}

function getColor() {
    const chance = Math.random();
    const colorDistribution = [
        [0.2, '#cf667a'],
        [0.4, '#cf66ae'],
        [1, '#cf6679']
    ];
    return colorDistribution.find(dist => chance < dist[0])[1];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function createStar() {
    const star = document.createElement('p');
    star.innerHTML = getStarIcon();
    star.className += 'star';
    star.style.top = `${getRandomInt(0, window.innerHeight)}px`;
    star.style.left = `${getRandomInt(0, window.innerWidth)}px`;
    star.style.color = getColor();
    star.style['animation-delay'] = `${getRandomInt(0, 5)}s`;
    star.style['animation-duration'] = `${getRandomInt(2, 4)}s`;
    document.body.appendChild(star);
}

const starCount = 500;
for (let i = 0; i < starCount; i++) {
    createStar();
}

function showSkeleton() {
    const widget = document.getElementById('scrobble-widget');
    widget.innerHTML = ''; // Clear any previous content

    for (let i = 0; i < 5; i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'scrobble';

        const albumArt = document.createElement('div');
        albumArt.className = 'skeleton skeleton-image';

        const details = document.createElement('div');
        details.className = 'scrobble-details';

        const track = document.createElement('div');
        track.className = 'skeleton skeleton-text';

        const artist = document.createElement('div');
        artist.className = 'skeleton skeleton-text';

        details.appendChild(track);
        details.appendChild(artist);

        skeleton.appendChild(albumArt);
        skeleton.appendChild(details);
        widget.appendChild(skeleton);
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    showSkeleton();
    try {
        const response = await fetch('https://necrozma.xyz/api/scrobbles/sansman68?limit=5');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const scrobbles = await response.json();
        renderScrobbles(scrobbles);
    } catch (error) {
        console.error('Error fetching scrobbles:', error);
    }
});

const scrobbles = [];

function renderScrobbles(data) {
    const widget = document.getElementById('scrobble-widget');
    widget.innerHTML = ''; // Clear existing content


    data.forEach(scrobble => {
        const scrobbleElement = document.createElement('div');
        scrobbleElement.className = 'scrobble';

        const albumArt = document.createElement('img');
        albumArt.src = scrobble.image.find(img => img.size === 'extralarge')?.['#text'] || '';
        albumArt.alt = `${scrobble.artist['#text']} album art`;

        const details = document.createElement('div');
        details.className = 'scrobble-details';

        const trackLink = document.createElement('a');
        trackLink.href = scrobble.url;
        trackLink.target = '_blank';
        trackLink.textContent = scrobble.name;

        const artist = document.createElement('span');
        artist.textContent = scrobble.artist['#text'];

        const album = document.createElement('span');
        album.textContent = scrobble.album['#text'];

        /*
        if (scrobble['@attr'] && scrobble['@attr'].nowplaying === "true") {
            const recordIcon = document.createElement('div');
            recordIcon.className = 'record-icon';
            scrobbleElement.appendChild(recordIcon);
        }
*/

        details.appendChild(trackLink);
        details.appendChild(artist);
        details.appendChild(album);

        scrobbleElement.appendChild(albumArt);
        scrobbleElement.appendChild(details);
        widget.appendChild(scrobbleElement);
    });
}
