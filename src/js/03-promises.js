import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const elForm = document.querySelector('.form');
elForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const { delay, step, amount } = e.target.elements;
  const obj = {
    delay: +delay.value,
    step: +step.value,
    amount: +amount.value,
  };
  if (isCheckNoValidData(obj)) {
    Notiflix.Notify.failure('Please enter correct data');
    return;
  }
  generatorPromises(obj);
}

// @return true if not valid @params
function isCheckNoValidData({ delay, step, amount }) {
  return delay < 0 || step < 0 || amount < 1 ? true : false;
}

function generatorPromises({ delay, step, amount }) {
  for (let index = 0; index < amount; index++) {
    createPromise(index + 1, delay + step * index)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      return shouldResolve
        ? resolve({ position, delay })
        : reject({ position, delay });
    }, delay)
  );
}
