const adForm = document.querySelector('.ad-form');
const formFieldset = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFilter = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelector('.map__features');
// const mapCanvas = document.querySelector('.map__canvas'); --------- Карта ---------

const switchPageState = (active) => {
  if (active) {
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('map__filters--disabled');
  }  else {
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
  }
  mapFeatures.disabled = active;
  formFieldset.forEach((element) => {
    element.disabled = active;
  });
  mapFilter.forEach((element) => {
    element.disabled = active;
  });
};

export {switchPageState, adForm};
