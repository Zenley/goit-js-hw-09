import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix, { Notify } from 'notiflix';

const startButton = document.querySelector('[data-start]');
const inputElem = document.querySelector('#datetime-picker');
const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsElem = document.querySelector('[data-seconds]');

let intervalId;
let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const now = new Date();
    selectedDate = selectedDates[0];
    
    if (selectedDate <= now) {
      Notify.failure("Please choose a date in the future");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(inputElem, options);

function startTimer() {
  startButton.disabled = true;
  intervalId = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const now = new Date();
  const ms = selectedDate - now;

  if (ms <= 0) {
    clearInterval(intervalId);
    startButton.disabled = false;
    return;
  }

  const time = convertMs(ms);
  daysElem.textContent = addLeadingZero(time.days);
  hoursElem.textContent = addLeadingZero(time.hours);
  minutesElem.textContent = addLeadingZero(time.minutes);
  secondsElem.textContent = addLeadingZero(time.seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

startButton.addEventListener('click', startTimer);
