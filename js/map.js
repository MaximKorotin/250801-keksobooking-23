import {switchPageState} from './form.js';
import {similarAds} from './create-ad.js';
import {generateAds} from './generator-ads.js';

const LAT_CENTER_TOKYO = 35.68940;
const LNG_CENTER_TOKYO = 139.69200;
const address = document.querySelector('#address');
const reset = document.querySelector('.ad-form__reset');

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
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
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

reset.addEventListener('click', () => {
  mainMarker.setLatLng({
    lat: LAT_CENTER_TOKYO,
    lng: LNG_CENTER_TOKYO,
  });
  map.setView({
    lat: LAT_CENTER_TOKYO,
    lng: LNG_CENTER_TOKYO,
  }, 12);
});

// Создаёт и добавляет группу меток на карту

const markerGroup = L.layerGroup().addTo(map);

// Создаёт метки с объявлениями

const createMarker = () => {
  for (let index = 0; index < similarAds.length; index++) {
    const lat = similarAds[index].location.lat;
    const lng = similarAds[index].location.lng;

    const icon = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      [
        lat,
        lng,
      ],
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
  }
};

createMarker();
