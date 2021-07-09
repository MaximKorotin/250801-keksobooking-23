const SERVER_ADDRESS_GET = 'https://23.javascript.pages.academy/keksobooking/data';
const SERVER_ADDRESS_POST = 'https://23.javascript.pages.academy/keksobooking';
const ALERT_SHOW_TIME = 5000;

let ads = [];

// Функция, показывающая сообщение об ошибке

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '1000';
  alertContainer.style.position = 'fixed';
  alertContainer.style.top = '40%';
  alertContainer.style.left = '25%';
  alertContainer.style.right = '25%';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.border = '2px solid black';
  alertContainer.style.borderRadius = '10px';
  alertContainer.style.backgroundColor = 'white';
  alertContainer.style.color = 'black';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

//  Функция получения данных с сервера

const getAdverts = () => ads;

const getData = async () => {
  let response;

  try {
    response = await fetch(SERVER_ADDRESS_GET);
    if (!response.ok) {
      throw new Error(`${response.status} — ${response.statusText}`);
    }
  } catch (err) {
    showAlert('Ошибка при загрузке данных с сервера. Попробуйте ещё раз.');
  }

  ads = await response.json();
  return ads;
};

//  Функция отправки данных на сервер

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SERVER_ADDRESS_POST,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        return;
      }
      onFail();
    })
    .catch(onFail);
};

export {getData, sendData, getAdverts};
