let $currencyOne = document.getElementById('currency-one');
const $amountOne = document.getElementById('amount-one');
let $currencyTwo = document.getElementById('currency-two');
const $amountTwo = document.getElementById('amount-two');

const $rate = document.getElementById('rate');
const $swap = document.getElementById('swap');

const ENDPOINT =  `https://api.exchangerate.host/latest/`;
let rate;

const setKeysToSelect = (object, select) => {
    Object.keys(object).forEach(item => {
        select.insertAdjacentHTML('beforeend', `<option value="${item}">${item}</option>`);
    });
}

const setBaseAmount = (select, value) => {
    select.querySelector(`option[value="${value}"]`).selected = true
};

fetch(ENDPOINT)
    .then(res => res.json())
    .then(data => {
        setKeysToSelect(data.rates, $currencyOne);
        setKeysToSelect(data.rates, $currencyTwo);
        setBaseAmount($currencyTwo, "RUB");
        setBaseAmount($currencyOne, "USD");
        calculate();
    });
//Fetch exchange rates and update the DOM
const calculate = () => {

    const currencyOne = $currencyOne.value;
    const currencyTwo = $currencyTwo.value;

    fetch(`${ENDPOINT}?base=${currencyOne}`)
        .then(res => res.json())
        .then(data => {
            rate = data.rates[currencyTwo];

            $rate.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
            $amountTwo.value = ($amountOne.value * rate).toFixed(2);
        })
}

const recalculate = () => $amountOne.value = ($amountTwo.value / rate).toFixed(2);

//Event listeners
$currencyOne.addEventListener('change', calculate);
$amountOne.addEventListener('input', calculate);
$currencyTwo.addEventListener('change', calculate);
$amountTwo.addEventListener('input', recalculate);

$swap.addEventListener('click', () => {
    [$currencyOne.value, $currencyTwo.value] = [$currencyTwo.value, $currencyOne.value];
    calculate();
})

calculate();