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
  }
  if (filterValue === priceCategories.middle) {
    return findings >= pricesRange.low && findings < pricesRange.high;
  }
  if (filterValue === priceCategories.high) {
    return findings >= pricesRange.high;
  }
  return true;
};

// Функция, создающая условия сравнения преимуществ в объявлении с выбранными в фильтре

const isMatchedFeatures = (findings) => {
  const checkedFeatures = document.querySelectorAll('input:checked');
  return Array.from(checkedFeatures).every((feature) => {
    if (findings) {
      return findings.includes(feature.value);
    }
  });
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

// Функция, устраняющая дребезг

function debounce (callback, timeoutDelay) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {isMatchedFilter, isMatchedPrice, isMatchedFeatures, setVisibilityItemAd, isEscEvent, debounce};
