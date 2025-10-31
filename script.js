const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const imagem = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;

musicFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

focoBt.addEventListener('click', () => {
    alterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

function alterarContexto(contexto){
    botoes.forEach((botao) => {
        botao.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    imagem.setAttribute('src', `/imagens/${contexto}.png`);
    switch(contexto){
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade, <br>
                <strong class="app__title-strong" > mergulhe no que importa! </strong>
            `;
            break;
        case 'descanso-curto': 
            titulo.innerHTML = `
            Que tal dar uma respirada? <br>
                <strong class="app__title-strong"> Faça uma pausa curta! </strong>
            `;
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície. 
            <strong class="app__title-strong"> Faça uma pausa longa.</strong>`;
            break;
    }

    try {
        switch (contexto) {
            case 'foco':
                duration = 25 * 60;
                break;
            case 'descanso-curto':
                duration = 5 * 60;
                break;
            case 'descanso-longo':
                duration = 15 * 60;
                break;
            default:
                duration = DEFAULT_DURATION;
        }
        if (typeof resetTimer === 'function') resetTimer();
    } catch (e) {
    }
}

const timerEl = document.getElementById('timer');
const startPauseBtn = document.getElementById('start-pause');
const startPauseIcon = startPauseBtn ? startPauseBtn.querySelector('img') : null;
const startPauseLabel = startPauseBtn ? startPauseBtn.querySelector('span') : null;


const alarmSound = new Audio('/sons/beep.mp3');
const playSound = new Audio('/sons/play.wav');
const pauseSound = new Audio('/sons/pause.mp3');

function playFallbackTone(frequency = 880, durationMs = 120) {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = frequency;
        osc.connect(gain);
        gain.connect(ctx.destination);
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.01);
        osc.start();
        setTimeout(() => {
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.01);
            try { osc.stop(); } catch (e) {}
            try { ctx.close(); } catch (e) {}
        }, durationMs);
    } catch (e) {
    }
}

const DEFAULT_DURATION = 5 * 60;
let duration = DEFAULT_DURATION;
let remaining = duration;
let intervalId = null;

function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

function updateTimerDisplay() {
    if (timerEl) timerEl.textContent = formatTime(remaining);
}

function startTimer() {
    if (intervalId) return;
    intervalId = setInterval(() => {
        if (remaining <= 0) {
            onTimerEnd();
            return;
        }
        remaining -= 1;
        updateTimerDisplay();
    }, 1000);
    if (startPauseIcon) startPauseIcon.src = '/imagens/pause.png';
    if (startPauseLabel) startPauseLabel.textContent = 'Pausar';
}

function pauseTimer() {
    if (!intervalId) return;
    clearInterval(intervalId);
    intervalId = null;
    if (startPauseIcon) startPauseIcon.src = '/imagens/play_arrow.png';
    if (startPauseLabel) startPauseLabel.textContent = 'Continuar';
}

function resetTimer() {
    pauseTimer();
    remaining = duration;
    updateTimerDisplay();
    if (startPauseIcon) startPauseIcon.src = '/imagens/play_arrow.png';
    if (startPauseLabel) startPauseLabel.textContent = 'Começar';
}

function onTimerEnd() {
    pauseTimer();
    try {
        alarmSound.play().catch(() => playFallbackTone(1200, 350));
    } catch (e) {
    }
    remaining = duration;
    updateTimerDisplay();
    if (startPauseIcon) startPauseIcon.src = '/imagens/play_arrow.png';
    if (startPauseLabel) startPauseLabel.textContent = 'Começar';
}

if (startPauseBtn) {
    startPauseBtn.addEventListener('click', () => {
        if (remaining <= 0) remaining = duration;

        if (!intervalId) {
            playSound.play().catch(() => playFallbackTone(1000, 120));
            startTimer();
        } else {
            pauseSound.play().catch(() => playFallbackTone(440, 100));
            pauseTimer();
        }
    });
}
updateTimerDisplay();