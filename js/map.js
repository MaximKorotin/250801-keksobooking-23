import {switchFormState, switchFilterState, resetPreview} from './form.js';
import {generateAds} from './generator-ads.js';
import {getAdverts, getData} from './data.js';

const PRICE = 1000;
const MAP_SCALE = 13;
const SIMILAR_ADS_COUNT = 10;
const LAT_CENTER_TOKYO = 35.67481;
const LNG_CENTER_TOKYO = 139.74859;
const MAIN_ICON_SIZE = [52, 52];
const MAIN_ICON_ANCHOR = [26, 52];
const ICON_SIZE = [40, 40];
const ICON_ANCHOR = [20, 40];

const filters = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');
const address = adForm.querySelector('#address');
const reset = adForm.querySelector('.ad-form__reset');
const price = adForm.querySelector('#price');

// const similarAds = getData();

const setAddress = (marker) => {
  const coordinates = marker.getLatLng();
  address.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
};

// Добавляет основу карты от Leaflet

const map = L.map('map-canvas')
  .on('load', () => {
    switchFormState(false);
  })
  .setView({
    lat: LAT_CENTER_TOKYO,
    lng: LNG_CENTER_TOKYO,
  }, MAP_SCALE);

// Добавляет слой с изображением карты от OpenStreetMap

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'},
).addTo(map);

// Меняет изображение основной метки на кастомную

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: MAIN_ICON_SIZE,
  iconAnchor: MAIN_ICON_ANCHOR,
});

// Добавляет основную метку

const mainMarker = L.marker(
  {
    lat: LAT_CENTER_TOKYO,
    lng: LNG_CENTER_TOKYO,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);

setAddress(mainMarker);

// Добавляет обработчик событий метки. При перемещение метки, возращаются новые координаты

mainMarker.on('moveend', () => {
  setAddress(mainMarker);
});

// Создаёт и добавляет группу меток на карту

const markerGroup = L.layerGroup().addTo(map);

// Создаёт метки с объявлениями

const similarOffers = (similarAds) => {
  similarAds.forEach((ad) => {

    const {lat, lng} = ad.location;

    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: ICON_SIZE,
      iconAnchor: ICON_ANCHOR,
    });

    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );

    marker
      .addTo(markerGroup)
      .bindPopup(
        generateAds(ad),
        {
          keepInView: true,
        },
      );
  });
};

const setMainMarker = () => {
  mainMarker.setLatLng({
    lat: LAT_CENTER_TOKYO,
    lng: LNG_CENTER_TOKYO,
  });
  map.setView({
    lat: LAT_CENTER_TOKYO,
    lng: LNG_CENTER_TOKYO,
  }, MAP_SCALE);
  setAddress(mainMarker);
};

// Функция, очистки группы меток

const clearMarker = () => {
  markerGroup.clearLayers();
  setMainMarker();
};

// При нажатие на кнопку "Очистить" основная метка, масштаб и центровка карты возращаются на исходную позицию

const restoreData = () => {
  filters.reset();
  adForm.reset();
  resetPreview();
  clearMarker();
  setMainMarker();
  similarOffers(getAdverts().slice(0, SIMILAR_ADS_COUNT));
  price.min = PRICE;
  price.placeholder = PRICE;
};

reset.addEventListener('click', (evt) => {
  evt.preventDefault();
  restoreData();
});

getData().then((ads) => {
  similarOffers(ads.slice(0, SIMILAR_ADS_COUNT));
  if (ads) {
    switchFilterState(false);
  }
});

export {restoreData, similarOffers, clearMarker};
