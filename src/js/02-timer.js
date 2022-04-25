import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "../css/timer.css";

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        closeEl(selectedDates[0]);
    },
};

const refs = {
    dateTimePicker: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

const fp = flatpickr('#datetime-picker', options);

const disabled = true;

refs.btnStart.disabled = disabled;
refs.btnStart.addEventListener('click', startTimer);

let chooseDate = Date.now();
let timerId = null;

function closeEl(value) {
    if (Date.now() > value) {
            Notify.failure('Please choose a date in the future');
        } else {
        refs.btnStart.disabled = !disabled;
        chooseDate = value;
        }
}

function startTimer() {
  refs.btnStart.disabled = disabled;
    timerId = setInterval(() => {
        let time = chooseDate - Date.now();
        const timeComponents = convertMs(time);
        markup(timeComponents);

        if (time <= 0) {
            clearInterval(timerId);
    }
    }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
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

function markup({ days, hours, minutes, seconds }) {
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, 0);
}