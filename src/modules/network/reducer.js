
import {createReducer} from '../../utils/reduxHelpers';
import {updateMap, getImmutableObject} from '../../utils/immutable';

import {
  CONNECTION_STATUS,
  CONNECTION_TYPE
} from './action';

import {CONNECTION_INITIAL_STATE} from './immutable';

export const connection = createReducer(CONNECTION_INITIAL_STATE, {
  [CONNECTION_STATUS]: (state, payload) => updateMap(state, getImmutableObject({online: payload})),
  [CONNECTION_TYPE]: (state, payload) => updateMap(state, getImmutableObject({type: payload}))
});
