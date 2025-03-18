let timerDisplay = document.getElementById("timer");
let sessionTypeDisplay = document.getElementById("sessionType");
let startPauseBtn = document.getElementById("startPauseBtn");
let resetBtn = document.getElementById("resetBtn");
let workInput = document.getElementById("workDuration");
let breakInput = document.getElementById("breakDuration");
let endSound = document.getElementById("endSound");

let workTime = parseInt(workInput.value) * 60;
let breakTime = parseInt(breakInput.value) * 60;
let timeLeft = workTime;
let isRunning = false;
let isWorkSession = true;
let timer = null;

const playButtonInnerHTML = `
        <svg 
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" 
            class="h-[24px] fill-white">
            <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
        </svg>
        <span class="text-xl">
            Start
        </span>
        `;

const pauseButtonInnerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="h-[24px] fill-white">
            <path d="M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z"/>
        </svg>
        <span class="text-xl">
            Pause
        </span>
        `;

// Met à jour le timer
function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Démarrer / Pause
function startPauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        startPauseBtn.innerHTML = playButtonInnerHTML;
    } else {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                switchSession();
            }
        }, 1000);
        startPauseBtn.innerHTML = pauseButtonInnerHTML;
    }
    isRunning = !isRunning;
}

// Changer de session
function switchSession() {
    clearInterval(timer);
    isWorkSession = !isWorkSession;
    timeLeft = isWorkSession ? workTime : breakTime;
    sessionTypeDisplay.textContent = isWorkSession ? "Work Time" : "Break Time";

    // Jouer un son à la fin d'une session
    endSound.play();

    alert(isWorkSession ? "Let's go back to work !" : "Well deserved break !");
    updateDisplay();
    startPauseTimer();
}

// Réinitialiser
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isWorkSession = true;
    workTime = parseInt(workInput.value) * 60;
    breakTime = parseInt(breakInput.value) * 60;
    timeLeft = workTime;
    updateDisplay();
    sessionTypeDisplay.textContent = "Work Time";
    startPauseBtn.innerHTML = playButtonInnerHTML;
}

// Mettre à jour les temps lorsque l'utilisateur change les valeurs
workInput.addEventListener("change", () => {
    workTime = parseInt(workInput.value) * 60;
    if (isWorkSession) timeLeft = workTime;
    updateDisplay();
});

breakInput.addEventListener("change", () => {
    breakTime = parseInt(breakInput.value) * 60;
    if (!isWorkSession) timeLeft = breakTime;
    updateDisplay();
});

// Boutons
startPauseBtn.addEventListener("click", startPauseTimer);
resetBtn.addEventListener("click", resetTimer);

// Initialisation
updateDisplay();
