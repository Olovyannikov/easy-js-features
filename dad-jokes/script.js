const jokeEl = document.getElementById('joke');
const jokeBtn = document.getElementById('jokeBtn');
const loader = document.querySelector('.loader');
const API = 'https://icanhazdadjoke.com/';

const config = {
    method: "GET",
    headers: {
        Accept: "application/json"
    }
}

const getData = async (url, options) => {
    const res = await fetch(url, options);
    return await res.json();
}

const generateJoke = () => {
    loader.style.display = 'flex';
    jokeEl.querySelector('p')?.remove();
    getData(API, config).then(data => {
        loader.style.display = 'none';
        jokeEl.insertAdjacentHTML('afterbegin', `<p>${data.joke}</p>`)
    });
}

generateJoke();

jokeBtn.addEventListener('click', generateJoke);