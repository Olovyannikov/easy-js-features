const panels = document.querySelectorAll('.panel');
const active = 'panel--active';

panels.forEach(panel => {
    panel.addEventListener('click', () => {
        removeActiveClasses();
        panel.classList.add(active);
    });
});

const removeActiveClasses = () => {
    panels.forEach(panel => {
        panel.classList.remove(active);
    });
}