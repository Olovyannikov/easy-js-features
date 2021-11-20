const search = document.querySelector('.search');
const btn = document.querySelector('.search__btn');
const input = document.querySelector('.search__input');

btn.addEventListener('click', () => {
    search.classList.toggle('search--active');
    input.focus();
});

input.addEventListener('blur', () => {
    search.classList.remove('search--active');
    input.value = '';
})