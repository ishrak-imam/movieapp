
/* eslint-disable */

import store from '../store'
import {showToast} from '../modules/toast/action'

const SERVER_URL = 'https://site-backend.herokuapp.com/';

function notOnlineHandler() {
  store.dispatch(showToast({message: 'Network disconnected'}));
  return Promise.reject({
    code: '000',
    message: 'Network disconnected',
    name: 'networkDisconnectedError'
  })
}

const responseHandler = response => {
  if (response.status === 200 || response.status === 201) {
    return response.json();
  }
  return response.json().then(e => {
    const {code, message, name} = e;
    return Promise.reject({code, message, name});
  });
};

export function postRequest (endPoint, data, headers = {}) {
  const {connection} = store.getState()
  if(connection.online) {
    return fetch(`${SERVER_URL}${endPoint}`, {
      method: 'POST',
      headers: {
        ...headers,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(responseHandler);
  }
  return notOnlineHandler()
}

export function getRequest (url, headers = {}) {
  const {connection} = store.getState()
  if(connection.online) {
    return fetch(`${SERVER_URL}${url}`, {
      method: 'GET',
      headers: {
        ...headers,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(responseHandler);
  }
  return notOnlineHandler()
}

// function buildUrl (endPoint, obj) {
//   let url = `${SERVER_URL}${endPoint}`;
//   if (obj) url = `${url}?${serialize(obj)}`; // for GET requests with query parameters
//   return url;
// }

// function serialize (obj) {
//   const queryParams = Object.keys(obj).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
//   return queryParams.join('&');
// }
