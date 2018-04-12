
import {postRequest, getRequest} from './utils/request';

export function loginRequest (data) {
  return postRequest('authentication', data);
}

export function registerRequest (data) {
  return postRequest('users', data);
}

export function getUserData (userId, jwt) {
  const headers = {
    'Authorization': `Bearer ${jwt}`
  };
  return getRequest(`users/${userId}`, headers);
}
