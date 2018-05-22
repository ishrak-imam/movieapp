
import {postRequest, getRequest} from '../../utils/request';

export const loginRequest = data => {
  return postRequest('authentication', data);
};

export const registerRequest = data => {
  return postRequest('users', data);
};

export const getUserData = (userId, jwt) => {
  const headers = {
    'Authorization': `Bearer ${jwt}`
  };
  return getRequest(`users/${userId}`, headers);
};
