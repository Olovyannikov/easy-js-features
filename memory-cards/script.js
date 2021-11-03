const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');
const API_KEY = `N7D9ojEXRh7l2amaCO3njPbQFEC3HFCmcvjtoJ2R`;
const API_LIMIT = 10;
const ENDPOINT = `https://quizapi.io/api/v1/questions?limit=${API_LIMIT}`;

// Keep track to current card
let currentActiveCard = 0;

// Store card data
let getQuestions = async () => await fetch(ENDPOINT, {
    method: "GET",
    headers: {
        'X-Api-Key': API_KEY
    }
});

getQuestions()
    .then(response => response.json())
    .then(data => {
        createCards(data);
        updateCurrentEl(data);
    });

// Create all cards
const createCards = (cardData) => {
    cardData.forEach((data, idx) => createCard(data, idx))
}

// Create single card
const createCard = (data, idx) => {
    const card = document.createElement('article');
    card.classList.add('card', 'cards__card');

    if (idx === 0) {
        card.classList.add('card--active');
    }

    card.innerHTML = template(data.question, data.answers[data.correct_answer]);

    // Add to DOM cards
    cardsContainer.append(card);
    card.addEventListener('click', () => card.classList.toggle('card--show-answer'));

}

const updateCurrentEl = (data) => {
    if (document.querySelectorAll('.card').length > 1) {
        currentEl.innerText = `${currentActiveCard + 1} / ${data.length}`;
        nextBtn.disabled = false;
        prevBtn.disabled = false;
    } else {
        currentEl.innerHTML = "0 / 0";
        nextBtn.disabled = true;
        prevBtn.disabled = true;
    }
}

const template = (q, a) => {
    return (
        `<div class="card__inner">
            <div class="card__inner-front">
                <p>${q}</p>
            </div>
            <div class="card__inner-back">
                <p>${a}</p>
            </div>
        </div>`);
}

// Event listeners

nextBtn.addEventListener('click', () => {
    const cardsElArr = document.querySelectorAll('.card');
    cardsElArr[currentActiveCard].className = 'cards__card card card--left';
    currentActiveCard = currentActiveCard + 1;

    if (currentActiveCard > cardsElArr.length - 1) {
        currentActiveCard = cardsElArr.length - 1;
    }

    cardsElArr[currentActiveCard].className = 'cards__card card card--active';

    updateCurrentEl(cardsElArr);
});

prevBtn.addEventListener('click', () => {
    const cardsElArr = document.querySelectorAll('.card');
    cardsElArr[currentActiveCard].className = 'cards__card card card--right';
    currentActiveCard = currentActiveCard - 1;

    if (currentActiveCard < 0) {
        currentActiveCard = 0;
    }

    cardsElArr[currentActiveCard].className = 'cards__card card card--active';

    updateCurrentEl(cardsElArr);
});

// Show add container
showBtn.addEventListener('click', () => {
    addContainer.classList.add('add-container--show');
});

// Hide add container
hideBtn.addEventListener('click', () => {
    addContainer.classList.remove('add-container--show')
});

// Add new card

addCardBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;

    if (question.trim() && answer.trim()) {
        const newCard = {
            question,
            answers: {
                answer_a: answer
            },
            correct_answer: "answer_a"
        }

        createCard(newCard, Math.random());
        updateCurrentEl(document.querySelectorAll('.card'));

        questionEl.value = '';
        answerEl.value = '';

        addContainer.classList.remove('add-container--show');
    }
});

clearBtn.addEventListener('click', () => {
    cardsContainer.innerHTML = '';
    updateCurrentEl('');
});