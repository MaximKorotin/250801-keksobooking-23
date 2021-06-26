// Функция, возвращающая случайное целое число из переданного диапазона включительно

const getRandomInteger = function (min, max) {
  if (min < 0) {
    throw new RangeError('Минимальное значение не может быть меньше 0');
  }
  if (max <= min) {
    throw new RangeError('Максимальное значение не может быть меньше или равное минимальному');
  }

  const randomNumber = Math.floor((Math.random() * (max - min + 1)) + min);

  return randomNumber;
};

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно

const getRandomFloating = function (min, max, decimal) {
  if (min < 0) {
    throw new RangeError('Минимальное значение не может быть меньше 0');
  }
  if (max <= min) {
    throw new RangeError('Максимальное значение не может быть меньше или равное минимальному');
  }

  const randomNumber = (Math.random() * (max - min) + min).toFixed(decimal);

  return randomNumber;
};

// Функция, получающая случайный элемент массива

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Функция, создающая массив произвольной длины

const createArrayRandomLength = (elements) => {
  const lengthArray = getRandomInteger(0, elements.length - 1);
  const array = new Array();

  for(let index = 0; index <= lengthArray; index++) {
    array.push(elements[index]);
  }

  return array;
};

// Функция, скрывающая пустые пункты объявления

const setVisibilityItemAd = (element, visible, content) => {
  element.textContent = content;

  if (visible) {
    element.classList.remove('hidden');
    return;
  }
  element.classList.add('hidden');
};

export {getRandomInteger, getRandomFloating, getRandomArrayElement, createArrayRandomLength, setVisibilityItemAd};
