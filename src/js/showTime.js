const timeCard =
  "<div class='time-card'><div class='time'><span class='hours'></span><span id='dots'>_</span><span class='min'></span></div><div class='date'>_</div></div>";

const dataShow = document.querySelector('.date-show');
dataShow.insertAdjacentHTML('afterbegin', timeCard);

const timeHTML = document.querySelector('.time');
const dateHTML = document.querySelector('.date');
const dotsElement = document.getElementById('dots');
const min = document.querySelector('.min');
const hours = document.querySelector('.hours');


function showTime() {
  setInterval(() => {
    const time = new Date();

    const h = time.getHours().toString().padStart(2, '0');
    const m = time.getMinutes().toString().padStart(2, '0');

    hours.textContent = h;
    min.textContent = m;
    const date = new Date().toLocaleString(navigator.language, {
      dateStyle: 'short',
    });
    dateHTML.textContent = date;
    dotsElement.textContent = dotsElement.textContent === ':' ? ' ' : ':';
  }, 1000);
}
showTime();
