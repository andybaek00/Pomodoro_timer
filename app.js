const studyTimer = document.querySelector(".main-study_timer");
const start = document.querySelector(".button");
let studyTime = 25 * 60 * 1000;
let breakTime = 5 * 60 * 1000;
let currentTime = studyTime;
let isStudySession = true;
let timeInterval;

function showTimer (milisecond) {
    const minutes = String(Math.floor(milisecond / (1000 * 60))).padStart(2, "0");
    const seconds = String(Math.floor((milisecond % (1000 * 60)) / 1000)).padStart(2, "0");
    studyTimer.innerText = minutes + ":" + seconds;
}

function startTimer () {
    const endTime = new Date().getTime() + currentTime;
    timeInterval = setInterval(function() {updateTimer(endTime);} , 1000);
}

function playAlarm() {
    const alarm = new Audio("Alarm Clock.mp3");
    alarm.play();
}

function updateTimer (endTime) {
    const now = new Date().getTime();
    const remainingTime = endTime - now;

    if (remainingTime > 0) {
        showTimer(remainingTime);
    } else {
        clearInterval(timeInterval);
        playAlarm();
        setTimeout(function() {
            isStudySession = !isStudySession;
            currentTime = isStudySession ? studyTime : breakTime;
            startTimer();}, 5000)
    }
}

function preventStart() {
    start.disabled = true;
    startTimer();
}

start.addEventListener("click", preventStart);