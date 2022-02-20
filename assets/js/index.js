let minutes = 0;
let breakTime = false;
const counterElem = document.getElementById("main-counter");
const startBtnElem = document.getElementById("start-btn");

const setCountMinutes = (num) => {
  minutes = new Date(new Date().getTime() + num * 60000);
  initPomodoro();
};

const playAlarm = () => {
  const alarmAudio = new Audio("./assets/sounds/alarm.mp3");
  alarmAudio.volume = 0.6;
  alarmAudio.play();
};

const setNextCounterBtnText = () => {
  breakTime
    ? (startBtnElem.textContent = "Iniciar descanso")
    : (startBtnElem.textContent = "Iniciar pomodoro");
};

const startNewCountDown = () => {
  breakTime ? setCountMinutes(5) : setCountMinutes(1);
};

const initPomodoro = () => {
  const interval = setInterval(() => {
    const futureDate = minutes;
    const actualDate = new Date().getTime();
    const datesDiff = futureDate - actualDate;
    let mins = Math.floor((datesDiff % (1000 * 60 * 60)) / (1000 * 60));
    let secs = Math.floor((datesDiff % (1000 * 60)) / 1000);
    if (mins >= 0 && secs >= 0) {
      counterElem.textContent = `${
        mins.toString().length < 2 ? `0${mins}` : mins
      }:${secs.toString().length < 2 ? `0${secs}` : secs}`;
    }
    if (datesDiff < 0) {
      breakTime = !breakTime;
      playAlarm();
      setNextCounterBtnText();
      //breakTime ? setCountMinutes(1) : setCountMinutes(1);
      clearInterval(interval);
    }
  }, 1000);
};

//Event listeners definitions

startBtnElem.addEventListener("click", () => {
  startNewCountDown();
});
