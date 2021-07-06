import {getData} from './data.js';
import {similarOffers, clearMarker} from './map.js';
import {isMatchedFilter, isMatchedPrice, isMatchedFeatures} from './util.js';
import {debounce} from './utils/debounce.js';

const SIMILAR_ADS_COUNT = 10;
const filters =document.querySelector('.map__filters');
const housingType = filters.querySelector('#housing-type');
const housingPrice = filters.querySelector('#housing-price');
const housingRooms = filters.querySelector('#housing-rooms');
const housingGuests = filters.querySelector('#housing-guests');
const housingFeatures = filters.querySelector('#housing-features');

let enabledFeatures = [];

const filtersAds = (ads) => {
  const matchType = isMatchedFilter(ads.offer.type, housingType.value);
  const matchPrice = isMatchedPrice(ads.offer.price, housingPrice.value);
  const matchRooms = isMatchedFilter(ads.offer.rooms, housingRooms.value);
  const matchGuests = isMatchedFilter(ads.offer.guests, housingGuests.value);
  const matchFeatures = isMatchedFeatures(ads.offer.features, enabledFeatures);

  housingFeatures.addEventListener('change', () => {
    const checkedFeatures = housingFeatures.querySelectorAll('input:checked');

    enabledFeatures = new Array(checkedFeatures.length)
      .fill(null)
      .map((_element, index) => checkedFeatures[index].value);
  });

  return matchType && matchPrice && matchRooms && matchGuests && matchFeatures;
};

const makeFilteredAds = () => {
  getData().then((ads) => similarOffers(ads.slice(0, SIMILAR_ADS_COUNT)));

  filters.addEventListener('change', () => {
    debounce(() => {
      clearMarker();
      getData()
        .then((ads) => similarOffers(ads
          .filter(filtersAds)
          .slice(0, SIMILAR_ADS_COUNT)));
    })();
  });
};

makeFilteredAds();

export {enabledFeatures};
