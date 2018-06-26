
import {Map} from 'immutable';
import {LOGIN_INITIAL_STATE, REGISTER_INITIAL_STATE} from '../modules/auth/immutable';
import {CONNECTION_INITIAL_STATE} from '../modules/network/immutable';

export const getInitialState = () => {
  return new Map({
    login: LOGIN_INITIAL_STATE,
    register: REGISTER_INITIAL_STATE,
    connection: CONNECTION_INITIAL_STATE
  });
};
