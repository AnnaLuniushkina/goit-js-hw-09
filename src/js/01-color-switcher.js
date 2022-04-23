function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

const disabled = true;
let timeInterval;

btnStart.addEventListener('click', onStartClick);
btnStop.addEventListener('click', onStopClick);

function changeBgColor() {
    document.body.style.backgroundColor = getRandomHexColor();
}

function onStartClick() {
    btnStart.disabled = disabled;
    btnStop.disabled = !disabled;
    timeInterval = setInterval(changeBgColor, 1000);
}

function onStopClick() {
    btnStart.disabled = !disabled;
    btnStop.disabled = disabled;
    clearInterval(timeInterval);
}
