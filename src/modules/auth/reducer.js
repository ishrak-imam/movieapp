
import {createReducer} from '../../utils/reduxHelpers';
import {mergeMapDeep, getMap} from '../../utils/immutable';

import {
  LOGIN_REQ, LOGIN_SUCS, LOGIN_FAIL,
  FACEBOOK_LOGIN,
  GET_USER_SUCS, // GET_USER_FAIL,
  REGISTER_REQ, REGISTER_SUCS, REGISTER_FAIL,
  LOGOUT_SUCS
} from './action';

import {LOGIN_INITIAL_STATE, REGISTER_INITIAL_STATE} from './immutable';

export const login = createReducer(LOGIN_INITIAL_STATE, {
  [LOGIN_REQ]: (state, payload) => mergeMapDeep(state, getMap({loading: payload.strategy === 'local'})),
  [FACEBOOK_LOGIN]: (state, payload) => mergeMapDeep(state, getMap({fbLoading: true})),
  [LOGIN_SUCS]: (state, payload) => mergeMapDeep(state, getMap({loading: false, fbLoading: false, token: getMap(payload)})),
  [LOGIN_FAIL]: (state, payload) => mergeMapDeep(state, getMap({loading: false, fbLoading: false})),
  [GET_USER_SUCS]: (state, payload) => mergeMapDeep(state, getMap({user: getMap(payload)})),
  // [GET_USER_FAIL]: (state, payload) => mergeMapDeep(state, getMap({error: getMap(payload)})),
  [LOGOUT_SUCS]: (state, payload) => state // just return the state as no update required
});

export const register = createReducer(REGISTER_INITIAL_STATE, {
  [REGISTER_REQ]: (state, payload) => mergeMapDeep(state, getMap({loading: true})),
  [REGISTER_SUCS]: (state, payload) => mergeMapDeep(state, getMap({loading: false, response: getMap(payload)})),
  [REGISTER_FAIL]: (state, payload) => mergeMapDeep(state, getMap({loading: false}))
});
