
import {showToast} from '../modules/toast/action';

const notOnline = showToast({message: 'Network disconnected'});

export const networkActionDispatcher = (dispatch, action, connection) => {
  connection.online ? dispatch(action) : dispatch(notOnline);
};

export const genericActionDispatcher = (dispatch, action) => {
  dispatch(action);
};
