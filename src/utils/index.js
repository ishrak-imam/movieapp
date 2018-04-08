
import jwtDecode from 'jwt-decode';
import {AsyncStorage} from 'react-native';

export function bindFunctions (functions) {
  functions.forEach(f => {
    this[f] = this[f].bind(this);
  });
}

export function getPayloadFromJwt (jwt) {
  return jwtDecode(jwt);
}

export function storeToken (token) {
  return AsyncStorage.setItem('jwt-token', token);
}

export function getToken () {
  return AsyncStorage.getItem('jwt-token');
}

export function removeToken () {
  return AsyncStorage.removeItem('jwt-token');
}
