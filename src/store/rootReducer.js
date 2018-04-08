import { combineReducers } from 'redux';

import * as authReducers from '../modules/auth/reducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  ...authReducers,
  form: formReducer
});
