// Некоторые части функций взяты со страниц:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/RangeError


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

getRandomInteger(1, 10);


// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно

const getRandomFloating = function (min, max, decimal) {
  if (min < 0) {
    throw new RangeError('Минимальное значение не может быть меньше 0');
  }
  if (max <= min) {
    throw new RangeError('Максимальное значение не может быть меньше или равное минимальному');
  }

  const randomNumber = (Math.random() * (max - min + 1) + min).toFixed(decimal);

  return `${randomNumber  } количество знаков после запятой: ${  decimal}`;
};

getRandomFloating(0, 100, 3);
