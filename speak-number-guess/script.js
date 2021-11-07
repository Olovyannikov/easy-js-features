const $msg = document.getElementById('msg');
const getRandomNumber = () => Math.floor(Math.random() * 100) + 1;
const randomNum = getRandomNumber();

console.log('Number is:', randomNum);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.webkitSpeechRecognition();

// Capture user speak
const onSpeak = (e) => {
    const msg = e.results[0][0].transcript;

    writeMessage(msg);
    checkNumber(msg);
}

const writeMessage = (msg) => {
    $msg.innerHTML = `<div> Ты говоришь: </div><span class="box">${msg}</span>`;
}

const checkNumber = (msg) => {
    const num = +msg;

    if (Number.isNaN(num)) {
        $msg.innerHTML += '<div>Это не чило :(</div>';
    }

    if (num > 100 || num < 1) {
        $msg.innerHTML += '<div>Число должно быть между 1 и 100</div>';
    }

    if (num === randomNum) {
        document.body.innerHTML = `
            <h2>Поздравления! Ты угадал число!!<br/><br/>
            Это было число ${num}</h2> 
            <button type="button" class="play-again" id="play-again">Играть еще</button>
        `;
    } else if (num > randomNum) {
        $msg.innerHTML += '<div>Чуть меньше</div>';
    } else if (num < randomNum) {
        $msg.innerHTML += '<div>Давай больше</div>';
    }
}

// Start recognition and game
recognition.start();

// Speak result
recognition.addEventListener('result', onSpeak);

// End SR service
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', e => {
    if (e.target.id === 'play-again') {
        window.location.reload();
    }
});