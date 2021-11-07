const draggableList = document.getElementById('draggable-list');
const checkBtn = document.getElementById('check');
const ENDPOINT = 'https://forbes400.herokuapp.com/api/forbes400';
const ENDPOINT_LIMIT = 10;
let dragStartIndex;

const getRichestPeople = async () => {
    const res = await fetch(`${ENDPOINT}/?limit=${ENDPOINT_LIMIT}`);
    const data = await res.json();
    renderList(data);
    draggableList.classList.add('load');
    checkBtn.addEventListener('click', () => checkOrder(data));
}

// Store list items
const renderList = (data) => {
    const listItems = [];
    data.map(item => listItems.push(item));
    draggableList.innerHTML = `${listItems.sort(() => (Math.random() > 0.5) ? 1 : -1).map((person, index) =>
        `<li data-id="${index}" class="draggable-list__item">
            <span class="number">${index + 1}</span>
            <div data-rank="${person.rank}" class="draggable" draggable="true">
                <p class="person-name">${person.personName}</p>
            </div>
        </li>`).join('')}`;

    addEventListeners();
}

function dragStart () {
    dragStartIndex = this.closest('li').getAttribute('data-id');
}
function dragOver (e) {
    e.preventDefault();
}
function dragDrop () {
    let dragEndIndex = this.closest('li').getAttribute('data-id');
    this.classList.remove('over');
    swapItems(dragStartIndex, dragEndIndex);
}
function dragEnter () {
    this.classList.add('over');
}
function dragLeave () {
    this.classList.remove('over');
}

const swapItems = (startIndex, endIndex) => {
    const listItems = document.querySelectorAll('.draggable-list li');
    const itemFrom = listItems[startIndex].querySelector('.draggable');
    const itemTo = listItems[endIndex].querySelector('.draggable');

    listItems[startIndex].append(itemTo);
    listItems[endIndex].append(itemFrom);
}

const addEventListeners = () => {
    const draggables = document.querySelectorAll('.draggable');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    draggables.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}

const checkOrder = (data) => {
    const listItems = document.querySelectorAll('.draggable-list .draggable');
    listItems.forEach((item, idx) => {
        if (+item.getAttribute('data-rank') !== data[idx].rank) {
            item.classList.add('wrong');
            item.classList.remove('right');
        } else {
            item.classList.add('right')
            item.classList.remove('wrong')
        }
    });
}

getRichestPeople();