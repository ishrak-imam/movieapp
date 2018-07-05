
import {getMap, getList} from '../../utils/immutable';

export const USER_INITIAL_STATE = getMap({
  loading: false,
  ids: getList([]),
  listById: getMap({}),
  metadata: getMap({})
});
