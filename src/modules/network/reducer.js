
import {createReducer, updateObject} from '../../utils/reduxHelpers';

import {
  CONNECTION_STATUS
} from './action';

const CONNECTION = {
  online: false,
  type: ''
};

export const connection = createReducer(CONNECTION, {
  [CONNECTION_STATUS]: (state, payload) => updateObject(state, {online: payload})
});
