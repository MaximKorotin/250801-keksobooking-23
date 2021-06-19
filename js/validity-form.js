import {adForm} from './form.js';

const minPrice = () => {
  const types = adForm.querySelector('#type');
  const price = adForm.querySelector('#price');

  types.addEventListener('change', () => {
    if (types.value === 'bungalow') {
      price.setAttribute('placeholder', '0');
      price.setAttribute('min', '0');
    } else if (types.value === 'flat') {
      price.setAttribute('placeholder', '1000');
      price.setAttribute('min', '1000');
    } else if (types.value === 'hotel') {
      price.setAttribute('placeholder', '3000');
      price.setAttribute('min', '3000');
    } else if (types.value === 'house') {
      price.setAttribute('placeholder', '5000');
      price.setAttribute('min', '5000');
    } else if (types.value === 'palace') {
      price.setAttribute('placeholder', '10000');
      price.setAttribute('min', '10000');
    }
  });
};

export {minPrice};
