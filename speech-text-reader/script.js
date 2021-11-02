const main = document.querySelector('.main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
    {
        image: './img/drink.jpg',
        text: "I'm Thirsty"
    },
    {
        image: './img/angry.jpg',
        text: "I'm Angry"
    },
    {
        image: './img/food.jpg',
        text: "I'm Hungry"
    },
    {
        image: './img/tired.jpg',
        text: "I'm Tired",
    },
    {
        image: './img/hurt.jpg',
        text: "I'm Hurt"
    },
    {
        image: './img/happy.jpg',
        text: "I'm Happy"
    },
    {
        image: './img/sad.jpg',
        text: "I'm Sad"
    },
    {
        image: './img/scared.jpg',
        text: "I'm Scared"
    },
    {
        image: './img/outside.jpg',
        text: "I Want To Go Outside"
    },
    {
        image: './img/home.jpg',
        text: "I Want To Go Home"
    },
    {
        image: './img/school.jpg',
        text: "I Want To Go To School"
    },
    {
        image: './img/grandma.jpg',
        text: "I Want To Go To Grandmas"
    }
];

const createBox = (item) => {
    const box = document.createElement('div');
    const {image, text} = item;
    box.classList.add('box');
    box.innerHTML = `
        <img src="${image}" alt="${text}">
        <p class="info">${text}</p>
    `;

    box.addEventListener('click', (e) => {
        setTextMessage(text);
        speakText();

        box.classList.add('active');
        setTimeout(() => {
            box.classList.remove('active');
        }, 1000);
    });

    main.append(box);
}

// Init speech synth
const message = new SpeechSynthesisUtterance();

data.forEach(createBox);

// Store voices

let voices = [];

const getVoices = () => {
    voices = speechSynthesis.getVoices();
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;

        voicesSelect.append(option);
    });
}

const setTextMessage = (text) => {
    message.text = text;
}

// Speak text
const speakText = () => {
    speechSynthesis.speak(message);
}

// Set voice
function setVoice (e) {
    message.voice = voices.find(voice => voice.name === e.target.value);
}

speechSynthesis.addEventListener('voiceschanged', getVoices);

toggleBtn.addEventListener('click', () =>
    document.querySelector('#text-box').classList.toggle('show'));

closeBtn.addEventListener('click', () =>
    document.querySelector('#text-box').classList.remove('show'));

// Change voice
voicesSelect.addEventListener('change', setVoice);

// Read Text btn
readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText();
});

getVoices();