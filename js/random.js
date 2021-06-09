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

  return `${randomNumber  } количество знаков после запятой: ${  decimal}`;
};

export {getRandomInteger, getRandomFloating};
