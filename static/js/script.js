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
        startPauseBtn.textContent = "Démarrer";
    } else {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                switchSession();
            }
        }, 1000);
        startPauseBtn.textContent = "Pause";
    }
    isRunning = !isRunning;
}

// Changer de session
function switchSession() {
    clearInterval(timer);
    isWorkSession = !isWorkSession;
    timeLeft = isWorkSession ? workTime : breakTime;
    sessionTypeDisplay.textContent = isWorkSession ? "Travail" : "Pause";
    document.body.classList.toggle("pause", !isWorkSession);
    
    // Jouer un son à la fin d'une session
    endSound.play();

    alert(isWorkSession ? "Retour au travail !" : "Pause bien méritée !");
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
    sessionTypeDisplay.textContent = "Travail";
    document.body.classList.remove("pause");
    startPauseBtn.textContent = "Démarrer";
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
