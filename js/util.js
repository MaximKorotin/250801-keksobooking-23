const ESC = 'Esc';
const ESCAPE = 'Escape';

const isEscEvent = (evt) => evt.key === ESC || evt.key === ESCAPE;

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

// Функция, скрывающая пустые пункты объявления

const setVisibilityItemAd = (element, visible, content) => {
  element.textContent = content;

  if (visible) {
    element.classList.remove('hidden');
    return;
  }
  element.classList.add('hidden');
};

export {getRandomInteger, setVisibilityItemAd, isEscEvent};
