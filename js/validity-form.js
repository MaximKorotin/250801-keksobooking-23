import {adForm} from './form.js';

const validityTitle = () => {
  const titleInput = document.querySelector('#title');
  const minAdLength = titleInput.minLength;
  const maxAdLength = titleInput.maxLength;

  titleInput.addEventListener('input', () => {
    const valueLength = titleInput.value.length;

    if (valueLength < minAdLength) {
      titleInput.setCustomValidity(`Заголовок объявления должен состоять минимум из
        ${minAdLength} символов. Добавьте ещё ${minAdLength - valueLength} симв.`);
    } else if (valueLength > maxAdLength) {
      titleInput.setCustomValidity(`Заголовок объявления должен состоять максимум из
        ${maxAdLength} символов. Удалите лишние ${valueLength - maxAdLength} симв.`);
    } else {
      titleInput.setCustomValidity('');
    }
    titleInput.reportValidity();
  });
};

const validityPrice = () => {
  const priceInput = document.querySelector('#price');
  const maxPrice = priceInput.max;

  priceInput.addEventListener('input', () => {
    if (priceInput.validity.rangeOverflow) {
      priceInput.setCustomValidity(`Максимальная сумма ${maxPrice}`);
    } else if (priceInput.validity.valueMissing) {
      priceInput.setCustomValidity('Поле обязательное для заполнения.');
    } else {
      priceInput.setCustomValidity('');
    }
    priceInput.reportValidity();
  });
};

const minPrice = () => {
  const types = adForm.querySelector('#type');
  const price = adForm.querySelector('#price');

  types.addEventListener('change', () => {
    switch (types.value) {
      case 'bungalow':
        return price.placeholder = '0';
      case 'flat':
        return price.placeholder = '1000';
      case 'hotel':
        return price.placeholder = '3000';
      case 'house':
        return price.placeholder = '5000';
      case 'palace':
        return price.placeholder = '10000';
    }
  });
};

export {validityTitle, validityPrice, minPrice};
