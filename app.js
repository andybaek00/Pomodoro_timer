const studyTimer = document.querySelector(".main-study_timer");
const breakTimer = document.querySelector(".main-break_timer");
const start = document.querySelector(".start-button");
const stop = document.querySelector(".reset-button");
const count = document.querySelector(".count");
let studyTime = 25 * 60 * 1000;
let breakTime = 5 * 60 * 1000;
let currentTime = studyTime;
let isStudySession = true;
let timeInterval;
let endTime;
let poma = 0;

function showTimer (milisecond, timeElement) {
    const minutes = String(Math.floor(milisecond / (1000 * 60))).padStart(2, "0");
    const seconds = String(Math.floor((milisecond % (1000 * 60)) / 1000)).padStart(2, "0");
    timeElement.innerText = minutes + ":" + seconds;
}

function startTimer () {
    const endTime = new Date().getTime() + currentTime;
    updateTimer(endTime - 1000);
    timeInterval = setInterval(function() {updateTimer(endTime);} , 1000);
}

function playAlarm(callback) {
    const alarm = new Audio("Alarm Clock.mp3");
    alarm.play();
    alarm.addEventListener("ended", callback);
}

function updateTimer (endTime) {
    const now = new Date().getTime();
    const remainingTime = endTime - now;

    stop.disabled = isStudySession;

    if (remainingTime > 0) {
        if (isStudySession) {
            showTimer(remainingTime, studyTimer);
        } else {
            showTimer(remainingTime, breakTimer);
        }
    } else {
        clearInterval(timeInterval);
        if (isStudySession) {
            poma += 1;
            count.innerText = `you have been studying " ${poma} " POMA today`;
            studyTimer.innerText = "25:00"
        } else {
            breakTimer.innerText = "05:00"
        }
        playAlarm(function() { 
            setTimeout(function() {
            isStudySession = !isStudySession;
            currentTime = isStudySession ? studyTime : breakTime;
            startTimer();}, 1)
        });
    }
    
}
function reset() {
    clearInterval(timeInterval)
    start.disabled = false;
    isStudySession = true;
    currentTime = studyTime;
    studyTimer.innerText = "25:00";
    breakTimer.innerText = "05:00";
    
}

function preventStart() {
    start.disabled = true;
    startTimer();
}

start.addEventListener("click", preventStart);
stop.addEventListener("click", reset)