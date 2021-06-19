const adForm = document.querySelector('.ad-form');
const formFieldset = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFilter = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelector('.map__features');
// const mapCanvas = document.querySelector('.map__canvas'); --------- Карта ---------

const formDisabled = () => {
  adForm.classList.add('ad-form--disabled');
  formFieldset.forEach((element) => {
    element.disabled = true;
  });
  mapFilters.classList.add('map__filters--disabled');
  mapFilter.forEach((element) => {
    element.disabled = true;
  });
  mapFeatures.disabled = true;
};

const formIncluded = () => {
  window.addEventListener('load', () => {
    adForm.classList.remove('ad-form--disabled');
    formFieldset.forEach((element) => {
      element.disabled = false;
    });
    mapFilters.classList.remove('map__filters--disabled');
    mapFilter.forEach((element) => {
      element.disabled = false;
    });
    mapFeatures.disabled = false;
  });
};

export {formDisabled, formIncluded, adForm};
