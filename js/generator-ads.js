import {similarAds} from './create-ad.js';

const generateAds = (ads) => {
  const matchingType = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalow: 'Бунгало',
    hotel: 'Отель',
  };

  const CARD = document.querySelector('#card').content.querySelector('.popup');
  const MAP_CANVAS_FRAGMENT = document.createDocumentFragment();

  ads.forEach(({offer, author}) => {
    const cardElement = CARD.cloneNode(true);

    author.avatar
      ? (cardElement.querySelector('.popup__avatar').src = author.avatar)
      : cardElement.querySelector('.popup__avatar').classList.add('hidden');
    offer.title
      ? (cardElement.querySelector('.popup__title').textContent = offer.title)
      : cardElement.querySelector('.popup__title').classList.add('hidden');
    offer.address
      ? (cardElement.querySelector('.popup__text--address').textContent = offer.address)
      : cardElement.querySelector('.popup__text--address').classList.add('hidden');
    offer.price
      ? (cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`)
      : cardElement.querySelector('.popup__text--price').classList.add('hidden');
    offer.type
      ? (cardElement.querySelector('.popup__type').textContent = matchingType[offer.type])
      : cardElement.querySelector('.popup__type').classList.add('hidden');
    offer.rooms && offer.guests
      ? (cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`)
      : cardElement.querySelector('.popup__text--capacity').classList.add('hidden');
    offer.checkin && offer.checkout
      ? (cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`)
      : cardElement.querySelector('.popup__text--time').classList.add('hidden');
    offer.features.length
      ? (cardElement.querySelector('.popup__features').textContent = offer.features)
      : cardElement.querySelector('.popup__features').classList.add('hidden');
    offer.description
      ? (cardElement.querySelector('.popup__description').textContent = offer.description)
      : cardElement.querySelector('.popup__description').classList.add('hidden');

    if (offer.photos) {
      const photoList = cardElement.querySelector('.popup__photos');
      const photoItem = cardElement.querySelector('.popup__photo');
      const photoFragment = document.createDocumentFragment();

      offer.photos.forEach((photo) => {
        const photoElement = photoItem.cloneNode(true);
        photoElement.setAttribute('src', photo);
        photoFragment.appendChild(photoElement);
      });

      photoList.innerHTML = '';
      photoList.appendChild(photoFragment);
    } else {
      cardElement.querySelector('.popup__photos').classList.add('hidden');
    }

    MAP_CANVAS_FRAGMENT.appendChild(cardElement);
  });

  return MAP_CANVAS_FRAGMENT;
};

const MAP_CANVAS = document.querySelector('#map-canvas');
const allAds = generateAds(similarAds);
MAP_CANVAS.appendChild(allAds.firstChild);
