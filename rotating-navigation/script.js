const $open = document.getElementById('nav-open');
const $close = document.getElementById('nav-close');
const $container = document.querySelector('.container');

$open.addEventListener('click', () => $container.classList.add('show-nav'));
$close.addEventListener('click', () => $container.classList.remove('show-nav'));