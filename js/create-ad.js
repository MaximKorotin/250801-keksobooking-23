import {getRandomInteger, getRandomFloating} from './random.js';
import {getRandomArrayElement, createArrayRandomLength} from './util.js';

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


// Функция, создающая новое объявление

const createAd = (index) => {
  const lat = getRandomFloating(35.65000, 35.70000, 5);
  const lng = getRandomFloating(139.70000, 139.80000, 5);

  return {
    author: {
      avatar: `img/avatars/user${index < 10 ? 0 : ''}${index}.png`,
    },
    offer: {
      title: 'Сдаётся',
      address: `${lat}, ${lng}`,
      price: getRandomInteger(0, 10000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInteger(1, 4),
      guests: getRandomInteger(1, 8),
      checkin: getRandomArrayElement(TIME),
      checkout: getRandomArrayElement(TIME),
      features: createArrayRandomLength(FEATURES).sort(() => Math.random() - 0.5),
      description: getRandomArrayElement(DESCRIPTION_HOUSING),
      photos: createArrayRandomLength(PHOTOS).sort(() => Math.random() - 0.5),
    },
    location: {
      lat,
      lng,
    },
  };
};

export {SIMILAR_AD_COUNT, createAd};
