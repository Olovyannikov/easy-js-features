const $toggleBtn = document.getElementById('toggle');
const $openBtn = document.getElementById('open');
const $closeBtn = document.getElementById('close');
const $modal = document.getElementById('modal');

//Toggle nav
$toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('show-nav');
    $toggleBtn.classList.toggle('toggle_active');
});

//Show modal
$openBtn.addEventListener('click', () => $modal.classList.add('show-modal'));

//Close modal
$closeBtn.addEventListener('click', () => $modal.classList.remove('show-modal'));

//Hide modal on outside click

window.addEventListener('click', (e) =>
    e.target === $modal ?
        $modal.classList.remove('show-modal') : false)