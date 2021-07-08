import {setVisibilityItemAd} from './util.js';

const card = document.querySelector('#card').content.querySelector('.popup');
const matchingType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

// Функция, создающая карточки с объявлениями

const generateAds = (ad) => {

  const cardElement = card.cloneNode(true);

  const title = cardElement.querySelector('.popup__title');
  setVisibilityItemAd(title, ad.offer.title, ad.offer.title);

  const address = cardElement.querySelector('.popup__text--address');
  setVisibilityItemAd(address, ad.offer.address, ad.offer.address);

  const price = cardElement.querySelector('.popup__text--price');
  setVisibilityItemAd(price, ad.offer.price, `${ad.offer.price} ₽/ночь`);

  const type = cardElement.querySelector('.popup__type');
  setVisibilityItemAd(type, ad.offer.type, matchingType[ad.offer.type]);

  const capacity = cardElement.querySelector('.popup__text--capacity');
  setVisibilityItemAd(capacity, ad.offer.rooms && ad.offer.guests, `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`);

  const time = cardElement.querySelector('.popup__text--time');
  setVisibilityItemAd(time, ad.offer.checkin && ad.offer.checkout, `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`);

  const description = cardElement.querySelector('.popup__description');
  setVisibilityItemAd(description, ad.offer.description, ad.offer.description);

  if (ad.author.avatar) {
    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
    cardElement.querySelector('.popup__avatar').classList.remove('hidden');
  } else {
    cardElement.querySelector('.popup__avatar').classList.add('hidden');
  }

  if (ad.offer.features) {
    const featuresList = cardElement.querySelector('.popup__features');
    const featuresItem = cardElement.querySelector('.popup__feature');
    const featuresFragment = document.createDocumentFragment();

    ad.offer.features.forEach((features) => {
      const featureElement = featuresItem.cloneNode(true);
      featureElement.classList.add(`popup__feature--${features}`);
      featuresFragment.appendChild(featureElement);
    });

    featuresList.innerHTML = '';
    featuresList.appendChild(featuresFragment);
  } else {
    cardElement.querySelector('.popup__features').classList.add('hidden');
  }

  if (ad.offer.photos) {
    const photoList = cardElement.querySelector('.popup__photos');
    const photoItem = cardElement.querySelector('.popup__photo');
    const photoFragment = document.createDocumentFragment();

    ad.offer.photos.forEach((photo) => {
      const photoElement = photoItem.cloneNode(true);
      photoElement.src = photo;
      photoFragment.appendChild(photoElement);
    });

    photoList.innerHTML = '';
    photoList.appendChild(photoFragment);
  } else {
    cardElement.querySelector('.popup__photos').classList.add('hidden');
  }

  return cardElement;
};

export {generateAds};
