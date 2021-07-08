import {getAdverts} from './data.js';
import {similarOffers, clearMarker} from './map.js';
import {isMatchedFilter, isMatchedPrice, isMatchedFeatures, debounce} from './util.js';

const SIMILAR_ADS_COUNT = 10;
const TIMEOUT_DELAY = 500;
const filters = document.querySelector('.map__filters');
const housingType = filters.querySelector('#housing-type');
const housingPrice = filters.querySelector('#housing-price');
const housingRooms = filters.querySelector('#housing-rooms');
const housingGuests = filters.querySelector('#housing-guests');

const filtersAds = () => {
  clearMarker();
  similarOffers(getAdverts()
    .filter((ads) =>
      isMatchedFilter(ads.offer.type, housingType.value)
      && isMatchedPrice(ads.offer.price, housingPrice.value)
      && isMatchedFilter(ads.offer.rooms, housingRooms.value)
      && isMatchedFilter(ads.offer.guests, housingGuests.value)
      && isMatchedFeatures(ads.offer.features))
    .slice(0, SIMILAR_ADS_COUNT));
};

const setFilteredAds = debounce(filtersAds, TIMEOUT_DELAY);

filters.addEventListener('change', () => {
  setFilteredAds();
});
