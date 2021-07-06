const ESC = 'Esc';
const ESCAPE = 'Escape';
const DEFAULT_FILTER = 'any';

const priceCategories = {
  middle: 'middle',
  low: 'low',
  high: 'high',
};

const pricesRange = {
  low: 10000,
  high: 50000,
};

const isEscEvent = (evt) => evt.key === ESC || evt.key === ESCAPE;

// Функция, создающая условия сравнения жилья с выбранными фильтрами

const isMatchedFilter = (findings, filterValue) =>
  String(findings) === String(filterValue) || filterValue === DEFAULT_FILTER;

// Функция, создающая условия сравнения стоимости жилья в объявлении с выбранной в фильтре

const isMatchedPrice = (findings, filterValue) => {
  if (filterValue === priceCategories.low) {
    return findings < pricesRange.low;
  } else if (filterValue === priceCategories.middle) {
    return findings >= pricesRange.low && findings < pricesRange.high;
  } else if (filterValue === priceCategories.high) {
    return findings >= pricesRange.high;
  }
  return true;
};

// Функция, создающая условия сравнения преимуществ в объявлении с выбранными в фильтре

const isMatchedFeatures = (findings, filterValue) => {
  if (filterValue.length === 0) {
    return true;
  } else if (findings) {
    return filterValue.every((feature) => findings.includes(feature));
  }
  return false;
};

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

export {getRandomInteger, isMatchedFilter, isMatchedPrice, isMatchedFeatures, setVisibilityItemAd, isEscEvent};
