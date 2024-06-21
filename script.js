// script.js

let metronomeInterval;
let isPlaying = false;
const audio = new Audio('click.wav'); // Carrega o arquivo de som
let tickCount = 0;
const ticksToIncrease = 16; // Aumentar a velocidade a cada 16 ticks
let increaseTimeout = null;
let isUpActive = false;

const playStopButton = document.getElementById('playStopButton');

playStopButton.addEventListener('click', function() {
    if (!isPlaying) {
        startMetronome();
    } else {
        stopMetronome();
    }
});

document.getElementById('upButton').addEventListener('click', function() {
    toggleUpFunction();
});

document.getElementById('bpmSlider').addEventListener('input', function() {
    updateBPM(this.value);
});

function startMetronome() {
    const bpm = document.getElementById('bpmSlider').value;
    const interval = calculateInterval();
    metronomeInterval = setInterval(() => {
        playClick();
        tickCount++;
        if (isUpActive && tickCount >= ticksToIncrease) {
            increaseBPM();
            tickCount = 0;
        }
    }, interval);

    playStopButton.textContent = 'Stop'; // Altera o texto para "Stop"
    isPlaying = true;
}

function stopMetronome() {
    clearInterval(metronomeInterval);
    playStopButton.textContent = 'Play'; // Altera o texto para "Play"
    isPlaying = false;
}

function playClick() {
    audio.currentTime = 0; // Reinicia o áudio para tocar imediatamente
    audio.play(); // Toca o som do clique
    blinkTitle();
}

function updateBPM(bpm) {
    document.getElementById('bpmOutput').textContent = `${bpm} BPM`;

    if (isPlaying) {
        clearInterval(metronomeInterval);
        const interval = calculateInterval();
        metronomeInterval = setInterval(() => {
            playClick();
            tickCount++;
            if (isUpActive && tickCount >= ticksToIncrease) {
                increaseBPM();
                tickCount = 0;
            }
        }, interval);
    }
}

function blinkTitle() {
    const title = document.getElementById('title');
    title.style.color = '#ffffff';
    setTimeout(() => {
        title.style.color = '#61dafb';
    }, 100);
}

function calculateInterval() {
    const bpm = document.getElementById('bpmSlider').value;
    return 60000 / bpm;
}

function increaseBPM() {
    let currentBPM = parseInt(document.getElementById('bpmSlider').value);
    const maxBPM = parseInt(document.getElementById('bpmSlider').max);

    if (currentBPM < maxBPM) {
        currentBPM += 2;
        document.getElementById('bpmSlider').value = currentBPM;
        updateBPM(currentBPM);
    }
}

function toggleUpFunction() {
    isUpActive = !isUpActive;
    if (isUpActive) {
        document.getElementById('upButton').classList.add('active');
    } else {
        document.getElementById('upButton').classList.remove('active');
    }
}
