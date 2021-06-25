const adForm = document.querySelector('.ad-form');
const price = adForm.querySelector('#price');

// Функция валидации заголовка объявления

const setValidityTitle = () => {
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

// Функция валидации максимальной цены в объявление

const setValidityMaxPrice = () => {
  const maxPrice = price.max;

  price.addEventListener('input', () => {
    if (price.validity.valueMissing) {
      price.setCustomValidity('Это поле обязательное для заполнения.');
    } else if (price.validity.rangeOverflow) {
      price.setCustomValidity(`Максимальная сумма ${maxPrice}`);
    } else {
      price.setCustomValidity('');
    }
    price.reportValidity();
  });
};

// Функция валидации количества комнот и людей в объявление

const setValidityCapacity = () => {
  const MAX_ROOMS = '100';
  const MIN_CAPACITY = '0';
  const rooms = adForm.querySelector('#room_number');
  const capacity = adForm.querySelector('#capacity');

  const setReport = (roomsReport, capacityReport) => {
    rooms.setCustomValidity(roomsReport);
    capacity.setCustomValidity(capacityReport);
  };

  const setСonditionsReview = () => {
    if (rooms.value === MAX_ROOMS && capacity.value !== MIN_CAPACITY) {
      setReport('Это помещение не для гостей', '');
    } else if (capacity.value === MIN_CAPACITY && rooms.value !== MAX_ROOMS) {
      setReport('', 'Выберите не менее одного гостя');
    } else if (capacity.value > rooms.value) {
      setReport('', 'число гостей не должно превышать число комнат.');
    } else {
      setReport('', '');
    }
    rooms.reportValidity();
    capacity.reportValidity();
  };

  rooms.addEventListener('input', () => {
    setСonditionsReview();
  });
  capacity.addEventListener('input', () => {
    setСonditionsReview();
  });
};

// Функция валидации минимальной цены в объявление

const setValidityMinPrice = () => {
  const types = adForm.querySelector('#type');

  const priceObject = {
    bungalow: 0,
    flat: 1000,
    hotel: 3000,
    house: 5000,
    palace: 10000,
  };

  types.addEventListener('change', () => {
    const minPriceValue = priceObject[types.value];
    price.min = minPriceValue;
    price.placeholder = minPriceValue;

    price.addEventListener('input', () => {
      if (price.value < minPriceValue) {
        price.setCustomValidity(`Значение должно быть больше или равно ${minPriceValue}`);
      } else {
        price.setCustomValidity('');
      }
      price.reportValidity();
    });
  });
};

// Функция валидации времени заезда и выезда в объявление

const setValidityTime = () => {
  const timeIn = adForm.querySelector('#timein');
  const timeOut = adForm.querySelector('#timeout');

  timeIn.addEventListener('input', () => {
    timeOut.value = timeIn.value;
  });
  timeOut.addEventListener('input', () => {
    timeIn.value = timeOut.value;
  });
};

setValidityTitle();
setValidityMaxPrice();
setValidityCapacity();
setValidityMinPrice();
setValidityTime();
