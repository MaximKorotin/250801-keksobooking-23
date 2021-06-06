// -------------------------- 2.14. Нужно больше функций -------------------------------

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


// ------------------------------ 4.9. Больше деталей -------------------------------------


const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const TIME = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESCRIPTION_HOUSING = [
  'Ультрасовременный по своему техническому оснащению дворец',
  'Уютная квартира',
  'Дом в тихом, спальном районе',
  'бунгало',
  'Номер в отеле',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const SIMILAR_AD_COUNT = 10;

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createArrayRandomLength = (elements) => {
  const lengthArray = getRandomInteger(0, elements.length - 1);
  const array = new Array();

  for(let index = 0; index <= lengthArray; index++) {
    array.push(elements[index]);
  }

  return array;
};

const createAd = (index) => {
  const LAT = getRandomFloating(35.65000, 35.70000, 5);
  const LNG = getRandomFloating(139.70000, 139.80000, 5);

  return {
    author: {
      avatar: `img/avatars/user${index < 10 ? 0 : ''}${index}.png`,
    },
    offer: {
      title: 'Сдаётся',
      address: `${LAT}, ${LNG}`,
      price: (getRandomInteger(0, 10000)),
      type: getRandomArrayElement(TYPES),
      rooms: (getRandomInteger(1, 4)),
      guests: (getRandomInteger(1, 8)),
      checkin: getRandomArrayElement(TIME),
      checkout: getRandomArrayElement(TIME),
      features: createArrayRandomLength(FEATURES).sort(() => Math.random() - 0.5),
      description: getRandomArrayElement(DESCRIPTION_HOUSING),
      photos: createArrayRandomLength(PHOTOS).sort(() => Math.random() - 0.5),
    },
    location: {
      lat: LAT,
      lng: LNG,
    },
  };
};

const similarAds = new Array(SIMILAR_AD_COUNT).fill(null).map((value, index) => createAd(index + 1)).sort(() => Math.random() - 0.3);

// eslint-disable-next-line no-console
console.log(similarAds);
