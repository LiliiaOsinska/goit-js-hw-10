import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// import errorImage from 

const dateTime = document.querySelector('#datetime-picker');
const btn = document.querySelector('button[data-start]');
const value = document.querySelectorAll('.value');

let userSelectedDate = '';
let currentDate = '';
let deltaTime;
btn.disabled = true;
btn.addEventListener('click', handleBtn);
// Підключення бібліотеки flatpickr
const dataTimeNew = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  dateFormat: 'Y-m-d H:i',
  defaultDate: new Date(),
  minuteIncrement: 1,
// Підключення бібліотеки iziToast
  onClose(selectedDates) {
    currentDate = new Date();
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];

    if (currentDate > userSelectedDate.getTime()) {
      btn.disabled = true;
      iziToast.show({
        title: '',
        message: 'Please choose a date in the future',
        messageColor: '#fff',
        messageSize: '18px',
        backgroundColor: '#f03838',
        position: 'topRight',
        iconUrl: '${errorImage}',
        iconColor: '#73020C',
        close: false,
        timeout: 2000,
        progressBar: false,
      });
    } else {
      btn.disabled = false;
    }
  },
});
let timerTime = null;
function handleBtn() {
  btn.disabled = true;

  timerTime = setInterval(() => {
    dateTime.disabled = true;
    currentDate = Date.now();
    deltaTime = userSelectedDate.getTime() - currentDate;
    const time = convertMs(deltaTime);
    if (deltaTime > 0) {
      const valueDate = [...value];
      valueDate[0].textContent = String(time.days).padStart(2, '0');
      valueDate[1].textContent = String(time.hours).padStart(2, '0');
      valueDate[2].textContent = String(time.minutes).padStart(2, '0');
      valueDate[3].textContent = String(time.seconds).padStart(2, '0');
    } else {
      dateTime.disabled = false;
    }
  }, 1000);
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
