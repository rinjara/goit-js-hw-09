import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  form: document.querySelector('.form'),
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(e) {
  e.preventDefault();
  const amount = Number(refs.amount.value);
  const step = Number(refs.step.value);
  let delayRef = Number(refs.delay.value);
  if (delayRef <= 0 || step < 0 || amount < 0) {
    Notify.warning(`Numbers must be positive only!!!`);
    return;
  }
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delayRef)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayRef += step;
  }
}

refs.form.addEventListener('submit', onFormSubmit);
