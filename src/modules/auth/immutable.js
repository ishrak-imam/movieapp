
import {getMap} from '../../utils/immutable';

export const LOGIN_INITIAL_STATE = getMap({
  loading: false,
  fbLoading: false,
  token: null,
  user: getMap({
    name: '',
    email: ''
  }),
  error: null
});

export const REGISTER_INITIAL_STATE = getMap({
  loading: false,
  error: null,
  response: null
});
