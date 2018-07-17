
import {showToast} from '../modules/toast/action';
import {readValue} from '../utils/immutable';

const notOnline = showToast({message: 'Network disconnected'});

export const networkActionDispatcher = (dispatch, action, connection) => {
  readValue('online', connection) ? dispatch(action) : dispatch(notOnline);
};

export const genericActionDispatcher = (dispatch, action) => {
  dispatch(action);
};

export const toastActionDispatcher = (dispatch, message) => {
  dispatch(showToast({message}));
};
