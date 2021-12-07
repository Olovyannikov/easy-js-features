const loadText = document.getElementById('loading-text');
const bg = document.querySelector('.bg');

let load = 0;
let int = setInterval(blurring, 30);

function blurring () {
    load > 99 ? clearInterval(int) : load++;
    loadText.innerText = `${load}%`;
    loadText.style.opacity = scale(load, 0, 100, 1, 0);
    bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
}

const scale = (num, in_min, in_max, out_min, out_max) =>
    (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;