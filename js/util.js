import {getRandomInteger} from './random.js';

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

export {getRandomArrayElement, createArrayRandomLength};
