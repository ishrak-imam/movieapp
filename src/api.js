
import {postRequest, getRequest} from './utils/request';

export function loginRequest (data) {
  return postRequest('authentication', data);
}

export function registerRequest (data) {
  return postRequest('users', data);
}

export function getUser (userId, token) {
  const headers = {
    'Authorization': `Bearer ${token}`
  };
  return getRequest(`users/${userId}`, headers);
}
