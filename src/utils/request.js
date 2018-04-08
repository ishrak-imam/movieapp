
/* eslint-disable */

const SERVER_URL = 'https://site-backend.herokuapp.com/';

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

export function getRequest (url, headers = {}) {
  return fetch(`${SERVER_URL}${url}`, {
    method: 'GET',
    headers: {
      ...headers,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(responseHandler);
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
