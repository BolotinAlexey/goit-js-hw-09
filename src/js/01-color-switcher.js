const TIME_FOR_CHANGIG_BACKGROUND = 1000;
const ref = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};
const bodyEl = document.querySelector('body');

let intervalID = null;

ref.start.addEventListener('click', startChangeColor);
ref.stop.addEventListener('click', stopChangeColor);

function startChangeColor() {
  intervalID = setInterval(changeBackground, TIME_FOR_CHANGIG_BACKGROUND);
}

function stopChangeColor() {
  clearInterval(intervalID);
}

function changeBackground() {
  bodyEl.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
