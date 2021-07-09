const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const PHOTO_ELEMENT_HTML = '<img class="ad-form__img" src="" alt="Фотография жилья" width="40" height="44">';
const DEFAULT_IMAGE = 'img/muffin-grey.svg';

const adForm = document.querySelector('.ad-form');
const formFieldset = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFilter = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelector('.map__features');
const avatarFileChooser = adForm.querySelector('#avatar');
const previewAvatar = adForm.querySelector('.ad-form-header__preview img');
const photoFileChooser = adForm.querySelector('#images');
const previewPhotoContainer = adForm.querySelector('.ad-form__photo');
previewPhotoContainer.insertAdjacentHTML('beforeend', PHOTO_ELEMENT_HTML);
const previewPhoto = previewPhotoContainer.querySelector('img');

// Функция переключения состояния активности формы

const switchFormState = (active) => {
  if (active) {
    adForm.classList.add('ad-form--disabled');
  }  else {
    adForm.classList.remove('ad-form--disabled');
  }
  formFieldset.forEach((element) => {
    element.disabled = active;
  });
};

// Функция переключения состояния активности фильтров

const switchFilterState = (active) => {
  if (active) {
    mapFilters.classList.add('map__filters--disabled');
  }  else {
    mapFilters.classList.remove('map__filters--disabled');
  }
  mapFeatures.disabled = active;
  mapFilter.forEach((element) => {
    element.disabled = active;
  });
};

// Функция загрузки и предпросмотра изображения

const addImage = (chooser, preview) => {
  chooser.addEventListener('change', () => {
    const file = chooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        preview.src = reader.result;
        preview.style.display = 'block';
      });

      reader.readAsDataURL(file);
    }
  });
};

// Функция сброса изображений до начальных значений

const resetPreview = () => {
  previewAvatar.src = DEFAULT_IMAGE;
  previewPhoto.style.display = 'none';
};

addImage(avatarFileChooser, previewAvatar);
addImage(photoFileChooser, previewPhoto);
switchFormState(true);
switchFilterState(true);

export {switchFormState, switchFilterState, resetPreview};
