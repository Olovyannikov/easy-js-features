const main = document.getElementById('main');
const addUser = document.getElementById('add-user');
const double = document.getElementById('double');
const showMillionaires = document.getElementById('show-millionaires');
const sort = document.getElementById('sort');
const calculateWealth = document.getElementById('calculate-wealth');

const ENDPOINT = 'https://randomuser.me/api';

let data = [];


//Format number as money
const formatMoney = num => '$' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,'$&,');

//fetch random user and money

const updateDOM = (providedData = data) => {
    //Clear main div
    main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;

    providedData.forEach((item) => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.append(element);
    })
}

const addData = obj => {
    data.push(obj);

    updateDOM();
}

const getRandomUser = async () => {
    const res = await fetch(ENDPOINT);
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000),
    };

    addData(newUser);
}

//Double Money

const getDoubleMoney = () => {
    data = data.map((user) => ({...user, money: user.money * 2}));
    updateDOM();
}

//Show only Mills;

const getMillionaires = () => {
    data = data.filter(user => user.money > 999999);
    updateDOM();
}

//Sort by richest

const sortByRichestUsers = () => {
    data.sort((a,b) => b.money - a.money);
    updateDOM();
}

//calculateTotal

const calculateTotal = () => {
    let total = data.reduce((acc, user) => (acc += user.money), 0);

    const element = document.createElement('div');
    element.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(total)}</strong></h3>`;
    main.append(element);
}

//Event Listeners
addUser.addEventListener('click', getRandomUser);
double.addEventListener('click', getDoubleMoney);
sort.addEventListener('click', sortByRichestUsers);
showMillionaires.addEventListener('click', getMillionaires);
calculateWealth.addEventListener('click', calculateTotal)