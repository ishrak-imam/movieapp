
import {createReducer} from '../../utils/reduxHelpers';
import {
  mergeMapDeep, concatList, getList,
  mergeMapShallow, getMap, readValue
} from '../../utils/immutable';

import {
  USER_GET_REQ,
  USER_GET_SUCS,
  USER_GET_FAIL
} from './action';

import {USER_INITIAL_STATE} from './immutable';

export const users = createReducer(USER_INITIAL_STATE, {
  [USER_GET_REQ]: (state, payload) => mergeMapDeep(state, getMap({loading: false})),
  [USER_GET_SUCS]: (state, payload) => {
    return mergeMapDeep(
      state,
      getMap({
        loading: false,
        ids: concatList(readValue('ids', state), getList(payload.ids)),
        listById: mergeMapShallow(readValue('listById', state), getMap(payload.listById)),
        metadata: mergeMapShallow(readValue('metadata', state), getMap(payload.metadata))
      })
    );
  },
  [USER_GET_FAIL]: (state, payload) => mergeMapDeep(state, getMap({loading: false}))
});
