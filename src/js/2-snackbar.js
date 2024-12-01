import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');

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
        imageWidth: 26,
        position: 'topRight',
        backgroundColor: '#51B687',
        progressBar: false,
        close: false,
        // iconUrl: ,
      });
    })
    .catch(error => {
      iziToast.error({
        titleColor: '#fff',
        message: `Rejected promise in ${delayValue}ms`,
        iconColor: '#fff',
        imageWidth: 26,
        position: 'topRight',
        backgroundColor: '#f03838',
        progressBar: false,
        close: false,
        // iconUrl: ,
      });
    })
    .finally(() => form.reset());
}
