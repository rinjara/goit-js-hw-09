const CHANGE_DELAY = 1000;
let intervalId = null;

const refs = {
  startChangingColorBtn: document.querySelector('[data-start]'),
  stopChangingColorBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBgColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
  refs.startChangingColorBtn.disabled = true;

  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, CHANGE_DELAY);
}

function stopChangingBgColor() {
  clearInterval(intervalId);
  refs.startChangingColorBtn.disabled = false;
}

refs.startChangingColorBtn.addEventListener('click', changeBgColor);
refs.stopChangingColorBtn.addEventListener('click', stopChangingBgColor);
