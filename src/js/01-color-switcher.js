const TIME_FOR_CHANGIG_BACKGROUND = 1e3;
const ref = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};
const bodyEl = document.querySelector('body');

let intervalID = null;

const d = Date.now();
setTimeout(() => {
  console.log('1000-1');
  setTimeout(() => console.log(`2000-${Date.now() - d}`), 2000);
  console.log('1000-2');
}, 1000);

ref.start.addEventListener('click', startChangeColor);
ref.stop.addEventListener('click', stopChangeColor);

function startChangeColor() {
  intervalID = intervalID
    ? intervalID
    : setInterval(changeBackground, TIME_FOR_CHANGIG_BACKGROUND);
}

function stopChangeColor() {
  intervalID = intervalID ? clearInterval(intervalID) : null;
}

function changeBackground() {
  bodyEl.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
