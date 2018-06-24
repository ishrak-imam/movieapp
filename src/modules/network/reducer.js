
import {createReducer} from '../../utils/reduxHelpers';
import {getMap, updateMap, getImmutableObject} from '../../utils/immutable';

import {
  CONNECTION_STATUS,
  CONNECTION_TYPE
} from './action';

const CONNECTION = getMap({
  online: false,
  type: ''
});

export const connection = createReducer(CONNECTION, {
  [CONNECTION_STATUS]: (state, payload) => updateMap(state, getImmutableObject({online: payload})),
  [CONNECTION_TYPE]: (state, payload) => updateMap(state, getImmutableObject({type: payload}))
});
