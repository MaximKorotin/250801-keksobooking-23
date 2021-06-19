import {similarAds} from './create-ad.js';
import {setVisibilityItemAd} from './util.js';

const generateAds = (ads) => {
  const matchingType = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalow: 'Бунгало',
    hotel: 'Отель',
  };

  const card = document.querySelector('#card').content.querySelector('.popup');
  const mapCanvasFragment = document.createDocumentFragment();

  ads.forEach(({offer, author}) => {
    const cardElement = card.cloneNode(true);

    cardElement.querySelector('.popup__avatar').src = author.avatar;

    const title = cardElement.querySelector('.popup__title');
    setVisibilityItemAd(title, offer.title, offer.title);

    const address = cardElement.querySelector('.popup__text--address');
    setVisibilityItemAd(address, offer.address, offer.address);

    const price = cardElement.querySelector('.popup__text--price');
    setVisibilityItemAd(price, offer.price, `${offer.price} ₽/ночь`);

    const type = cardElement.querySelector('.popup__type');
    setVisibilityItemAd(type, offer.type, matchingType[offer.type]);

    const capacity = cardElement.querySelector('.popup__text--capacity');
    setVisibilityItemAd(capacity, offer.rooms && offer.guests, `${offer.rooms} комнаты для ${offer.guests} гостей`);

    const time = cardElement.querySelector('.popup__text--time');
    setVisibilityItemAd(time, offer.checkin && offer.checkout, `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);

    const description = cardElement.querySelector('.popup__description');
    setVisibilityItemAd(description, offer.description, offer.description);

    if (offer.features) {
      const featuresList = cardElement.querySelector('.popup__features');
      const featuresItem = cardElement.querySelector('.popup__feature');
      const featuresFragment = document.createDocumentFragment();

      offer.features.forEach((features) => {
        const featureElement = featuresItem.cloneNode(true);
        featureElement.classList.add(`popup__feature--${features}`);
        featuresFragment.appendChild(featureElement);
      });

      featuresList.innerHTML = '';
      featuresList.appendChild(featuresFragment);
    } else {
      cardElement.querySelector('.popup__features').classList.add('hidden');
    }

    if (offer.photos) {
      const photoList = cardElement.querySelector('.popup__photos');
      const photoItem = cardElement.querySelector('.popup__photo');
      const photoFragment = document.createDocumentFragment();

      offer.photos.forEach((photo) => {
        const photoElement = photoItem.cloneNode(true);
        photoElement.src = photo;
        photoFragment.appendChild(photoElement);
      });

      photoList.innerHTML = '';
      photoList.appendChild(photoFragment);
    } else {
      cardElement.querySelector('.popup__photos').classList.add('hidden');
    }

    mapCanvasFragment.appendChild(cardElement);
  });

  return mapCanvasFragment;
};

const mapCanvas = document.querySelector('#map-canvas');
const allAds = generateAds(similarAds);
mapCanvas.appendChild(allAds.firstChild);
