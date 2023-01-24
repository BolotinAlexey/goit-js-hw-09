import fp from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const TIME_REFRESH_INTERFACE = 1000;
fp('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onChooseDate(selectedDates[0]);
  },
});

let intervalID = null;

const ref = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
const starEl = document.querySelector('[data-start]');

// @param - selected date
function onChooseDate(date) {
  if (date > Date.now()) {
    starEl.addEventListener('click', start.bind(null, date));
  } else handlerWrongDate();
}

function start(date) {
  starEl.removeEventListener('click', start);
  intervalID = setInterval(timerHundler, TIME_REFRESH_INTERFACE, date);
}

function handlerWrongDate() {
  Notiflix.Notify.failure('Please choose a date in the future');
}

// @param - number of milliseconds per unit of time
// @return - object in format { days, hours, minutes, seconds }
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(timeObject) {
  return Object.entries(timeObject)
    .map(en => [en[0], en[1] < 10 ? '0'.concat(en[1]) : String(en[1])])
    .reduce((obj, el) => ({ ...obj, [el[0]]: el[1] }), {});

  //.reduce((obj, el) => (obj[el[0]] = el[1]), {}) Why don't work??
}

function timerHundler(date) {
  currentDate = Date.now();
  if (date < currentDate) {
    clearInterval(intervalID);
    console.log(intervalID);
    return;
  }
  Object.keys(ref).forEach(
    key =>
      (ref[key].textContent = addLeadingZero(convertMs(date - currentDate))[
        key
      ])
  );
  //   const { days, hours, minutes, seconds } = addLeadingZero(convertMs(ms));
  //   ref.days.textContent = days;
  //   ref.hours.textContent = hours;
  //   ref.minutes.textContent = minutes;
  //   ref.seconds.textContent = seconds;
  //   console.log(days, hours, minutes, seconds);
}
