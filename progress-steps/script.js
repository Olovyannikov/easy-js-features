const $progress = document.getElementById('progress-bar');
const $prev = document.getElementById('progress-prev');
const $next = document.getElementById('progress-next');
const $circles = document.querySelectorAll('.circles__item');

let currentActive = 1;

$next.addEventListener('click', () =>
    currentActive < $circles.length ? currentActive++ && update() : currentActive && update());

$prev.addEventListener('click', () =>
    currentActive > 0 ? currentActive-- && update() : currentActive = 1 && update());

const update = () => {
    $circles.forEach((circle, idx) => {
        idx < currentActive ?
            circle.classList.add('circles__item--active') :
            circle.classList.remove('circles__item--active')
    });

    const activeCount = document.querySelectorAll('.circles__item--active');
    $progress.style.width = `${((activeCount.length - 1) / ($circles.length - 1)) * 100}%`;
    $prev.disabled = currentActive === 1;
    $next.disabled =  currentActive === $circles.length;
}