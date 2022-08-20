import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

let CHOOSEN_DATE = '';
let timerId = null;

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),

  daysRef: document.querySelector('[data-days]'),
  hoursRef: document.querySelector('[data-hours]'),
  minutesRef: document.querySelector('[data-minutes]'),
  secondsRef: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    CHOOSEN_DATE = selectedDates[0];

    if (CHOOSEN_DATE - Date.now() <= 0) {
      Notify.warning('Please choose a date in the future');
      //   window.alert('Please choose a date in the future');
    } else {
      Notify.success('Now you can start your Countdown');
      refs.startBtn.disabled = false;
      timerUpdate();
      refs.startBtn.addEventListener('click', startTimer);
    }
  },
};

flatpickr(refs.input, options);

function startTimer() {
  timerId = setInterval(() => {
    refs.startBtn.disabled = true;
    refs.input.disabled = true;

    timerUpdate();

    ////////////////// Вирішила винести окремо це в функцію function timerUpdate(),
    ////////////////// щоб на початку вибору дати вона відображалася.

    // const currentTime = Date.now();
    // const timeLeft = CHOOSEN_DATE - currentTime;
    // const timeComponents = convertMs(timeLeft);
    // updateTimerFace(timeComponents);
    // if (timeLeft <= 1000) {
    //   stopTimer();
    // }
  }, 1000);
}

function timerUpdate() {
  const currentTime = Date.now();
  const timeLeft = CHOOSEN_DATE - currentTime;
  const timeComponents = convertMs(timeLeft);
  updateTimerFace(timeComponents);
  if (timeLeft <= 1000) {
    stopTimer();
  }
}

function stopTimer() {
  refs.input.disabled = false;
  refs.startBtn.disabled = false;
  clearInterval(timerId);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.daysRef.textContent = `${days}`;
  refs.hoursRef.textContent = `${hours}`;
  refs.minutesRef.textContent = `${minutes}`;
  refs.secondsRef.textContent = `${seconds}`;
}
