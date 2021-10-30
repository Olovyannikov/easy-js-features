const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game');
const settingsBtn = document.getElementById('settings-btn');
const settingsForm = document.getElementById('settings');
const settingsSelect = document.getElementById('form');
const difficultySelect = document.getElementById('difficulty');
const wordEndpointApi = 'https://random-word-api.herokuapp.com';
const loading = `
            <div class="loader show" id="loading">
                <span class="circle"></span><span class="circle"></span><span class="circle"></span>
            </div>
    `;
// List of words for games

const getRandomWord = (wordsArray) => wordsArray[Math.floor(Math.random() * wordsArray.length)];

const getWords = async () => {
    word.innerText = '';
    word.insertAdjacentHTML('afterbegin', loading);
    const response = await fetch(`${wordEndpointApi}/word?number=1`)
    const wordlist = await response.json();
    word.insertAdjacentHTML('beforeend', `${getRandomWord(wordlist)}`);
    word.removeChild(word.querySelector('#loading'));
    return wordlist;
}

// Init Difficulty

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';
difficultySelect.value = difficulty;

//Init score
let score = 0;

//Init time;
let time = 10;

const updateScore = () => {
    score++;
    scoreEl.innerHTML = score;
}

const gameOver = () => {
    endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your finale score is ${score}</p>
        <button type="button" onclick="location.reload()">Reload</button>
    `;

    endgameEl.style.display = 'flex';
}

const updateTime = () => {
    time--;
    timeEl.innerHTML = `${time}s`;

    if (time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}

const timeInterval = setInterval(updateTime, 1000);

text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if (insertedText === word.innerText) {
        getWords();
        updateScore();
        e.target.value = '';

        if (difficulty === 'hard') {
            time += 2;
        } else if (difficulty === 'medium') {
            time += 3;
        } else {
            time += 5;
        }

        updateTime();
    }
});

// Settings

settingsBtn.addEventListener('click', () => settingsForm.classList.toggle('header--hidden'));
settingsSelect.addEventListener('change', (e) => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});

// Init game

const initGame = () => {
    getWords();
    text.focus();
    updateTime();
}

window.addEventListener('DOMContentLoaded', initGame)