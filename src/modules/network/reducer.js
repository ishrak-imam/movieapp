
import {createReducer} from '../../utils/reduxHelpers';
import {mergeMapDeep, getMap} from '../../utils/immutable';

import {
  CONNECTION_STATUS,
  CONNECTION_TYPE
} from './action';

import {CONNECTION_INITIAL_STATE} from './immutable';

export const connection = createReducer(CONNECTION_INITIAL_STATE, {
  [CONNECTION_STATUS]: (state, payload) => mergeMapDeep(state, getMap({online: payload})),
  [CONNECTION_TYPE]: (state, payload) => mergeMapDeep(state, getMap({type: payload}))
});
