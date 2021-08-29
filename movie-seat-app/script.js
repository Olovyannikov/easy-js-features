const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.seat_occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

//Save selected movie index and price

const setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Update total and count
const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat_selected');
    const selectedSeatsCount = selectedSeats.length;

    const seatsIndex =[...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

//Get data from localStorage and populate UI

function populateUI()  {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    selectedSeats !== null && selectedSeats.length > 0 ?
        seats.forEach((seat, index) => {
            selectedSeats.indexOf(index) > -1 ?
                seat.classList.add('seat_selected') : ''
        }) : ''

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    selectedMovieIndex !== null ?
        movieSelect.selectedIndex = selectedMovieIndex : ''
}

//Movie select event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

//Seat click event

seats.forEach(seat => seat.addEventListener('click', () => {
    seat.classList.toggle('seat_selected');
    updateSelectedCount();
}))

//Initial count and total set
updateSelectedCount();