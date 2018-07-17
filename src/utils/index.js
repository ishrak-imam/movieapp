
import jwtDecode from 'jwt-decode';
import {AsyncStorage} from 'react-native';

export function bindFunctions (functions) {
  functions.forEach(f => {
    if (typeof this[f] === 'function') {
      this[f] = this[f].bind(this);
    }
  });
}

export const getPayloadFromJwt = jwt => {
  return jwtDecode(jwt);
};

export const storeToken = token => {
  return AsyncStorage.setItem('jwt-token', token);
};

export const getToken = () => {
  return AsyncStorage.getItem('jwt-token');
};

export const removeToken = () => {
  return AsyncStorage.removeItem('jwt-token');
};
