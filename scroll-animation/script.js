const animateClass = 'box_animate';

const boxes = document.querySelectorAll('.box');

window.addEventListener('scroll', checkBoxes);

function checkBoxes () {
    const triggerBottom = window.innerHeight / 5 * 4;
    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;
        boxTop < triggerBottom ? box.classList.add(animateClass) : box.classList.remove(animateClass);
    })
}

checkBoxes();