import {restoreData} from './map.js';
import {sendData} from './data.js';

const adForm = document.querySelector('.ad-form');
const success = document.querySelector('#success').content.querySelector('.success');
const error = document.querySelector('#error').content.querySelector('.error');
const errorButton = error.querySelector('.error__button');
const successMessage = success.cloneNode(true);
const errorMessage = error.cloneNode(true);

const resetData = () => {
  adForm.reset();
  restoreData();
};

const isEscEvent = (evt) => evt.key === 'Esc' || evt.key === 'Escape';

// Функция закрывающая окно сообщения

const closePopup = () => {
  if (document.body.contains(successMessage)) {
    document.body.removeChild(successMessage);
    resetData();
  } else {
    document.body.removeChild(errorMessage);
  }
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

const onPopupClick = (evt) => {
  evt.preventDefault();
  closePopup();
};

// Функция показывающая сообщение об успешном создании объявления

const showPopupSuccess = () => {
  document.body.appendChild(successMessage);
  document.addEventListener('keydown', onPopupEscKeydown);
  successMessage.addEventListener('click', onPopupClick);
};

// Функция показывающая сообщение об ошибке

const showErrorMessage = () => {
  document.body.appendChild(errorMessage);
  document.addEventListener('keydown', onPopupEscKeydown);
  errorMessage.addEventListener('click', onPopupClick);
  errorButton.addEventListener('click', closePopup);
};

// Функция отправки созданных объявлений

const setFormSubmitAds = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => showPopupSuccess(),
      () => showErrorMessage(),
      new FormData(evt.target),
    );
  });
};

setFormSubmitAds();
