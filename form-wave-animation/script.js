const labelAnimation = (element) => {
    const el = document.querySelector(element);
    el.innerHTML =
        el.innerText
            .split('')
            .map((item, idx) =>
                `<span style="transition-delay: ${idx * 50}ms">${item}</span>`)
            .join('');
};

document.addEventListener('DOMContentLoaded', () => {
    labelAnimation('#email label span', );
    labelAnimation('#password label span', );
});