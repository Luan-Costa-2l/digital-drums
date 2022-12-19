c = (el) => document.querySelector(el);
cs = (el) => document.querySelectorAll(el);

function playSound(sound) {
    let audioElement = c(`#${sound}`);
    let keyElement = c(`div[data-key="${sound}"]`);

    if(audioElement) {
        audioElement.currentTime = 0;
        audioElement.play();
    }

    if(keyElement) {
        keyElement.classList.add('active');
        setTimeout(() => {
            keyElement.classList.remove('active');
        }, 200);
    }    
}

function playComposition(event) {
    event.preventDefault();

    let input = c('input').value;

    if (input != '') {
        let composition = input.split('');
        let wait = 0;
        composition.map((item) => {
            setTimeout(() => {
                playSound(`key${item}`);
            }, wait);

            wait += 300;
        })
    }
}

document.addEventListener('keyup', (event) => {
    playSound(event.code.toLocaleLowerCase());
});

c('form').addEventListener('submit', playComposition);

cs('.key').forEach((item) => {
    let key = item.getAttribute('data-key');
    item.addEventListener('click', () => playSound(key));
});