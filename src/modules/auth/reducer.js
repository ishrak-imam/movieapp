
import {createReducer} from '../../utils/reduxHelpers';
import {updateMap, getMap} from '../../utils/immutable';

import {
  LOGIN_REQ, LOGIN_SUCS, LOGIN_FAIL,
  FACEBOOK_LOGIN,
  GET_USER_SUCS, GET_USER_FAIL,
  REGISTER_REQ, REGISTER_SUCS, REGISTER_FAIL,
  LOGOUT_SUCS
} from './action';

import {LOGIN_INITIAL_STATE, REGISTER_INITIAL_STATE} from './immutable';

export const login = createReducer(LOGIN_INITIAL_STATE, {
  [LOGIN_REQ]: (state, payload) => updateMap(state, getMap({loading: payload.strategy === 'local', error: null})),
  [FACEBOOK_LOGIN]: (state, payload) => updateMap(state, getMap({fbLoading: true, error: null})),
  [LOGIN_SUCS]: (state, payload) => updateMap(state, getMap({loading: false, fbLoading: false, token: payload})),
  [LOGIN_FAIL]: (state, payload) => updateMap(state, getMap({loading: false, fbLoading: false, error: payload})),
  [GET_USER_SUCS]: (state, payload) => updateMap(state, getMap({user: payload})),
  [GET_USER_FAIL]: (state, payload) => updateMap(state, getMap({error: payload})),
  [LOGOUT_SUCS]: (state, payload) => state // just return the initial state as no update required
});

export const register = createReducer(REGISTER_INITIAL_STATE, {
  [REGISTER_REQ]: (state, payload) => updateMap(state, getMap({loading: true, error: null})),
  [REGISTER_SUCS]: (state, payload) => updateMap(state, getMap({loading: false, response: payload})),
  [REGISTER_FAIL]: (state, payload) => updateMap(state, getMap({loading: false, error: payload}))
});
