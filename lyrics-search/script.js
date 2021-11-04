const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const ENDPOINT = 'https://api.lyrics.ovh';

// Search by song or artist

const searchSongs = async term => {
    const res = await fetch(`${ENDPOINT}/suggest/${term}`);
    const data = await res.json();
    showData(data);
}

// Get prev and next songs
const getMoreSongs = async (url) => {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();
    showData(data);
}

// Show song and artist in DOM
const showData = (data) => {
    result.innerHTML = `
        <ul class="songs">
            ${data.data.map(song =>
        `
                <li class="songs__item">
                    <span>
                        <strong>
                            ${song.artist.name} - ${song.title}
                        </strong>
                    </span>
                    <button class="btn" data-song-title="${song.title}" data-artist="${song.artist.name}">
                        Get Lyrics
                    </button>
                </li>`
    ).join('')}
        </ul>
    `;

    if (data.prev || data.next) {
        more.innerHTML = `
            ${data.prev ? `<button onclick="getMoreSongs('${data.prev}')" class="btn">Prev</button>` : ''}
            ${data.next ? `<button onclick="getMoreSongs('${data.next}')" class="btn">Next</button>` : ''}
        `
    } else {
        more.innerHTML = '';
    }
}

const getLyrics = async (artist, song) => {
    const res = await fetch(`${ENDPOINT}/v1/${artist}/${song}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>').replace(`Paroles de la chanson ${song} par ${artist}`, '');
    result.innerHTML = `
        <h2><strong>${artist}</strong>  - ${song}</h2>
        <span>${lyrics}</span>
`;

    more.innerHTML = '';
}

// Event listeners
form.addEventListener('submit', e => {
    e.preventDefault();
    const searchTerm = search.value.trim();

    if (!searchTerm) {
        alert('Please type in a search term');
    } else {
        searchSongs(searchTerm);
    }
});

// Get lyrics btn click
result.addEventListener('click', e => {
    const target = e.target;

    if (target.tagName === 'BUTTON') {
        const artist = target.getAttribute('data-artist');
        const song = target.getAttribute('data-song-title');

        getLyrics(artist, song);
    }
});