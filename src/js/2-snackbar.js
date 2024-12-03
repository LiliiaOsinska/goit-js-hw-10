import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
const inputFulfilled = document.querySelector('input[value="fulfilled"]');
const inputRejected = document.querySelector('input[value="rejected"]');
const btn = document.querySelector('button[type="submit"]');
const inputDelay = document.querySelector('input[name="delay"]');
const fieldsetBox = document.querySelector('fieldset');
import okImage from '../img/icon-ok.svg';
import errorImage from '../img/icon-error.svg';
form.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();

  const delayValue = event.target.elements.delay.value;
  //   console.log(delayValue);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const stateValue = event.target.elements.state.value;
      //   console.log(stateValue);

      if (stateValue === 'fulfilled') {
        resolve(`Fulfilled promise in ${delayValue}ms`);
      } else {
        reject(`Rejected promise in ${delayValue}ms`);
      }
    }, delayValue);
  });
  promise
    .then(result => {
      iziToast.success({
        titleColor: '#fff',
        message: `Fulfilled promise in ${delayValue}ms`,
        iconColor: '#fff',
        iconUrl: `${okImage}`,
        imageWidth: 26,
        position: 'topRight',
        backgroundColor: '#59a10d',
        progressBar: false,
        close: false,
      });
    })
    .catch(error => {
      iziToast.error({
        titleColor: '#fff',
        message: `Rejected promise in ${delayValue}ms`,
        iconColor: '#fff',
        iconUrl: `${errorImage}`,
        imageWidth: 26,
        position: 'topRight',
        backgroundColor: '#ef4040',
        progressBar: false,
        close: false,
      });
    })
    .finally(() => form.reset());
}

fieldsetBox.classList.add('fieldset-box');
inputFulfilled.classList.add('input-fulfilled');
inputRejected.classList.add('input-rejected');
btn.classList.add('button-create');
inputDelay.classList.add('input-delay');
