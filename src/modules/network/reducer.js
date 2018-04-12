
import {createReducer, updateObject} from '../../utils/reduxHelpers';

import {
  CONNECTION_STATUS,
  CONNECTION_TYPE
} from './action';

const CONNECTION = {
  online: false,
  type: ''
};

export const connection = createReducer(CONNECTION, {
  [CONNECTION_STATUS]: (state, payload) => updateObject(state, {online: payload}),
  [CONNECTION_TYPE]: (state, payload) => updateObject(state, {type: payload})
});
