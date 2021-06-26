import {switchPageState} from './form.js';
import {similarAds} from './create-ad.js';
import {generateAds} from './generator-ads.js';

const LAT_CENTER_TOKYO = 35.68940;
const LNG_CENTER_TOKYO = 139.69200;
const MAIN_ICON_SIZE = [52, 52];
const MAIN_ICON_ANCHOR = [26, 52];
const ICON_SIZE = [40, 40];
const ICON_ANCHOR = [20, 40];
const address = document.querySelector('#address');
const reset = document.querySelector('.ad-form__reset');
address.value = '35.68940, 139.69200';

// Добавляет основу карты от Leaflet

const map = L.map('map-canvas')
  .on('load', () => {
    switchPageState(false);
  })
  .setView({
    lat: LAT_CENTER_TOKYO,
    lng: LNG_CENTER_TOKYO,
  }, 12);

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

// Добавляет обработчик событий метки. При перемещение метки, возращаются новые координаты

mainMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  address.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
});

// При нажатие на кнопку "Очистить" основная метка, масштаб и центровка карты возращаются на исходную позицию

reset.addEventListener('click', (evt) => {
  evt.preventDefault();
  reset.closest('form').reset();
  mainMarker.setLatLng({
    lat: LAT_CENTER_TOKYO,
    lng: LNG_CENTER_TOKYO,
  });
  map.setView({
    lat: LAT_CENTER_TOKYO,
    lng: LNG_CENTER_TOKYO,
  }, 12);
  document.querySelector('#price').placeholder = 1000;
  address.value = '35.68940, 139.69200';
});

// Создаёт и добавляет группу меток на карту

const markerGroup = L.layerGroup().addTo(map);

// Создаёт метки с объявлениями

const createMarker = (index) => {
  const {lat, lng} = similarAds[index].location;

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
      generateAds[index],
      {
        keepInView: true,
      },
    );
};

similarAds.forEach((value, index) => {
  createMarker(index);
});
