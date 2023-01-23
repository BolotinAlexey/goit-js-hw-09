import fp from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
fp('#myID', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
});
const ref = {
  start: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
ref.start.addEventListener('click', start);
function start() {
  const startDate = Date.now();
  if (isValidDate) {
  }
}
