
import {createReducer, updateObject} from '../../utils/reduxHelpers';

import {
  LOGIN_REQ, LOGIN_SUCS, LOGIN_FAIL,
  REGISTER_REQ, REGISTER_SUCS, REGISTER_FAIL,
  LOGOUT_SUCS
} from './action';

const LOGIN = {
  loading: false,
  user: null
};

const REGISTER = {
  loading: false,
  error: null,
  response: null
};

export const login = createReducer(LOGIN, {
  [LOGIN_REQ]: (state, payload) => updateObject(state, {loading: true, error: null}),
  [LOGIN_SUCS]: (state, payload) => updateObject(state, {loading: false, user: payload}),
  [LOGIN_FAIL]: (state, payload) => updateObject(state, {loading: false, error: payload}),
  [LOGOUT_SUCS]: (state, payload) => updateObject(state, {loading: false, user: null})
});

export const register = createReducer(REGISTER, {
  [REGISTER_REQ]: (state, payload) => updateObject(state, {loading: true, error: null}),
  [REGISTER_SUCS]: (state, payload) => updateObject(state, {loading: false, response: payload}),
  [REGISTER_FAIL]: (state, payload) => updateObject(state, {loading: false, error: payload})
});
