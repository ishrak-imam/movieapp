
import {createReducer} from '../../utils/reduxHelpers';
import {updateMap, pushIntoList, getMap, shiftFromList} from '../../utils/immutable';

import {
  API_CALL_ERROR,
  CLEAR_ERROR
} from './action';

import {ERROR_INITIAL_STATE} from './immutable';

export const error = createReducer(ERROR_INITIAL_STATE, {
  [API_CALL_ERROR]: (state, payload) => {
    return updateMap(state, 'list', errorList => pushIntoList(errorList, getMap(payload)));
  },
  [CLEAR_ERROR]: state => updateMap(state, 'list', errorList => shiftFromList(errorList))
});
