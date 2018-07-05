
import {createReducer} from '../../utils/reduxHelpers';
import {
  updateMap, concatList, getList,
  mergeMapShallow, getMap
} from '../../utils/immutable';

import {
  USER_GET_REQ,
  USER_GET_SUCS,
  USER_GET_FAIL
} from './action';

import {USER_INITIAL_STATE} from './immutable';

export const users = createReducer(USER_INITIAL_STATE, {
  [USER_GET_REQ]: (state, payload) => updateMap(state, getMap({loading: false})),
  [USER_GET_SUCS]: (state, payload) => {
    return updateMap(
      state,
      getMap({
        loading: false,
        ids: concatList(state.get('ids'), getList(payload.ids)),
        listById: mergeMapShallow(state.get('listById'), getMap(payload.listById)),
        metadata: payload.metadata
      })
    );
  },
  [USER_GET_FAIL]: (state, payload) => updateMap(state, getMap({loading: false}))
});
