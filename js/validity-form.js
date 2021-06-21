import {adForm} from './form.js';

const validityTitle = () => {
  const titleInput = adForm.querySelector('#title');
  const minAdLength = titleInput.minLength;
  const maxAdLength = titleInput.maxLength;

  titleInput.addEventListener('input', () => {
    const valueLength = titleInput.value.length;

    if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Это поле обязательно для заполнения.');
    } else if (valueLength < minAdLength) {
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
  const PRICE = adForm.querySelector('#price');
  const maxPrice = PRICE.max;

  PRICE.addEventListener('input', () => {
    if (PRICE.validity.valueMissing) {
      PRICE.setCustomValidity('Поле обязательное для заполнения.');
    } else if (PRICE.validity.rangeOverflow) {
      PRICE.setCustomValidity(`Максимальная сумма ${maxPrice}`);
    } else {
      PRICE.setCustomValidity('');
    }
    PRICE.reportValidity();
  });
};

const validityCapacity = () => {
  const rooms = adForm.querySelector('#room_number');
  const capacity = adForm.querySelector('#capacity');

  adForm.addEventListener('change', () => {
    if (rooms.value === '100' && capacity.value !== '0') {
      rooms.setCustomValidity('Это помещение не для гостей');
      capacity.setCustomValidity('');
    } else if (capacity.value === '0' && rooms.value !== '100') {
      capacity.setCustomValidity('Выберите не менее одного гостя');
      rooms.setCustomValidity('');
    } else if (capacity.value > rooms.value) {
      capacity.setCustomValidity('число гостей не должно превышать число комнат.');
      rooms.setCustomValidity('');
    } else {
      rooms.setCustomValidity('');
      capacity.setCustomValidity('');
    }
    rooms.reportValidity();
    capacity.reportValidity();
  });
};

export {validityTitle, validityPrice, validityCapacity};
