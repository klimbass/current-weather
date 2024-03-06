import './js/showTime';
import {fetchRespWeather} from './js/fetchResponseWeather'

const form = document.querySelector('.form');
const img = document.querySelector('.image');
const title = document.querySelector('.title');
const curWeather = document.querySelector('.current-weather');
const date = document.querySelector('.date-show span');
const btnSubmit = document.querySelector('#btn-submit');
btnSubmit.disabled = true;

const bookMark = document.querySelector('#bookmark')
const bookMarkSave = document.querySelector('.save')
const localeCityKey = 'City'


const url = 'https://api.openweathermap.org/data/2.5/weather?';
let icon;
const option = new URLSearchParams({
  appid: '117bcd5592950f9f701a11f5ab982de0',
  units: 'metric',
  q: '',
});

form.addEventListener('input', event => {
  if (event.target.value.trim()) {
    btnSubmit.disabled = false;
  }
});

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  img.textContent = '';
  option.set('q', event.target.city.value.trim());
  console.log(option.get('q'));
  if (option.get('q')) {
    fetchRespWeather(url, option)
    .then(data => {
        title.textContent = data.name + ' ' + data.sys.country;
        icon = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        img.insertAdjacentHTML(
          'afterbegin',
          `<img src="${iconUrl}" width="80" height="80" />`
        );
        console.log(data.main.temp_min, data.main.temp_max);
        let tempMin = Math.round(data.main.temp_min);
        if (tempMin > 0) {
          tempMin = `+${tempMin}`;
        }
        let tempMax = Math.round(data.main.temp_max);
        if (tempMax > 0) {
          tempMax = `+${tempMax}`;
        }
        curWeather.textContent = `${tempMin} - ${tempMax}`;
      })
      .catch(() => {
        console.log('Sorry, such city not found!');
      })
      .finally(() => form.reset());
  }
}

bookMark.addEventListener('click', handleSave)

function handleSave() {
  if (bookMarkSave.classList.contains('invisible')) {
    if (option.get('q')) {
    bookMarkSave.classList.remove('invisible')
      localStorage.setItem(localeCityKey, option.get('q'))
    }
  } else {
  bookMarkSave.classList.add('invisible')   
    localStorage.removeItem(localeCityKey)
  }
}

if (localStorage.getItem(localeCityKey)) {
  bookMarkSave.classList.remove('invisible')
  option.set('q', localStorage.getItem(localeCityKey))
  fetchRespWeather(url, option)
    .then(data => {
        title.textContent = data.name + ' ' + data.sys.country;
        icon = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        img.insertAdjacentHTML(
          'afterbegin',
          `<img src="${iconUrl}" width="80" height="80" />`
        );
        console.log(data.main.temp_min, data.main.temp_max);
        let tempMin = Math.round(data.main.temp_min);
        if (tempMin > 0) {
          tempMin = `+${tempMin}`;
        }
        let tempMax = Math.round(data.main.temp_max);
        if (tempMax > 0) {
          tempMax = `+${tempMax}`;
        }
        curWeather.textContent = `${tempMin} - ${tempMax}`;
      })
      .catch(() => {
        console.log('Sorry, such city not found!');
      })
}