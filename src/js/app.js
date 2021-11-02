import debounce from 'lodash.debounce';
import countryMarkup from '../countryMarkup.hbs';
import countriesMarkup from '../countriesMarkup.hbs';

// import { alert, defaultModules } from '../../node_modules/@pnotify/core/dist/PNotify.js';
// import * as PNotifyMobile from '../../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';


//   defaultModules.set(PNotifyMobile, {});

// PNotify.alert({
//   text: 'Notice me, senpai!',
// });

const searchRef = document.querySelector('[data-action="search"]');
const countryRef = document.querySelector('.country');

searchRef.addEventListener('input', debounce(renderCountry, 500));

function onSearch() {
  if (searchRef.value.trim() === '') {
    return fetch(`https://restcountries.com/v2/name/${searchRef.value}`)
      .then((countryRef.innerHTML = ''))
      .catch(error => console.log(error));
  }
  return fetch(`https://restcountries.com/v2/name/${searchRef.value}`)
    .then(response => response.json())
    .catch(error => console.log(error));
}

function renderCountry() {
  onSearch().then(data => {
    if (data.status === 404) {
      countryRef.innerHTML = '';
      return;
    }
    if (data.length >= 2 && data.length <= 10) {
      countryRef.innerHTML = '';
      countryRef.insertAdjacentHTML('beforeend', countriesMarkup(data));
      return;
    }
    countryRef.innerHTML = '';
    countryRef.insertAdjacentHTML('beforeend', countryMarkup(data));
  });
}
