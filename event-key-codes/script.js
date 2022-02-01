const init = () => {
    const insert = document.getElementById('insert');

    window.addEventListener('keydown', (e) => {
        insert.innerHTML = `
            <div class="key__value">
                ${e.key === ' ' ? 'Space' : e.key}
                <small>event.key</small>
            </div>
            <div class="key__value">
                ${e.keyCode}
                <small>event.keyCode</small>
            </div>
            <div class="key__value">
                ${e.code}
                <small>event.code</small>
            </div>
        `;
    });
};

document.addEventListener('DOMContentLoaded', () => {
    init();
});