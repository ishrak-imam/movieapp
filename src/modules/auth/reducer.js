
import {createReducer, updateObject} from '../../utils/reduxHelpers';

import {
  LOGIN_REQ, LOGIN_SUCS, LOGIN_FAIL,
  GET_USER_SUCS, GET_USER_FAIL,
  REGISTER_REQ, REGISTER_SUCS, REGISTER_FAIL,
  LOGOUT_SUCS
} from './action';

const LOGIN = {
  loading: false,
  token: null,
  user: {
    firstName: '',
    lastName: ''
  },
  error: null
};

const REGISTER = {
  loading: false,
  error: null,
  response: null
};

export const login = createReducer(LOGIN, {
  [LOGIN_REQ]: (state, payload) => updateObject(state, {loading: payload.strategy === 'local', error: null}),
  [LOGIN_SUCS]: (state, payload) => updateObject(state, {loading: false, token: payload}),
  [LOGIN_FAIL]: (state, payload) => updateObject(state, {loading: false, error: payload}),
  [GET_USER_SUCS]: (state, payload) => updateObject(state, {user: payload}),
  [GET_USER_FAIL]: (state, payload) => updateObject(state, {error: payload}),
  [LOGOUT_SUCS]: (state, payload) => state // just return the initial state as no update required
});

export const register = createReducer(REGISTER, {
  [REGISTER_REQ]: (state, payload) => updateObject(state, {loading: true, error: null}),
  [REGISTER_SUCS]: (state, payload) => updateObject(state, {loading: false, response: payload}),
  [REGISTER_FAIL]: (state, payload) => updateObject(state, {loading: false, error: payload})
});
