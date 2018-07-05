
import { combineReducers } from 'redux-immutable';
import {getInitialState} from '../utils/initialState';
import {
  LOGOUT_SUCS
} from '../modules/auth/action';

import * as authReducers from '../modules/auth/reducer';
import * as connectionReducer from '../modules/network/reducer';
import * as userReducer from '../modules/users/reducer';
import { reducer as formReducer } from 'redux-form/immutable';

const appReducer = combineReducers({
  form: formReducer,
  ...connectionReducer,
  ...authReducers,
  ...userReducer
});

const rootReduces = (state, action) => {
  // clean-up state on logout
  if (action.type === LOGOUT_SUCS) {
    const connection = state.get('connection');
    state = getInitialState().set('connection', connection); // keep network status data as it is
  }
  return appReducer(state, action);
};

export default rootReduces;
