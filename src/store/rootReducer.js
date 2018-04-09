
import { combineReducers } from 'redux';

import {
  LOGOUT_SUCS
} from '../modules/auth/action';

import * as authReducers from '../modules/auth/reducer';
import * as connectionReducer from '../modules/network/reducer';
import { reducer as formReducer } from 'redux-form';

const appReducer = combineReducers({
  form: formReducer,
  ...connectionReducer,
  ...authReducers
});

const rootReduces = (state, action) => {
  // clean-up state on logout
  if (action.type === LOGOUT_SUCS) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReduces;
