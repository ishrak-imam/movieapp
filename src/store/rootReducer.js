
import { combineReducers } from 'redux-immutable';

import {
  LOGOUT_SUCS
} from '../modules/auth/action';

import * as authReducers from '../modules/auth/reducer';
import * as connectionReducer from '../modules/network/reducer';
import { reducer as formReducer } from 'redux-form/immutable';

const appReducer = combineReducers({
  form: formReducer,
  ...connectionReducer,
  ...authReducers
});

// const rootReduces = (state, action) => {
//   // clean-up state on logout
//   if (action.type === LOGOUT_SUCS) {
//     const {connection} = state;
//     state = {connection}; // keep network status data as it is
//   }
//   return appReducer(state, action);
// };

export default appReducer;
