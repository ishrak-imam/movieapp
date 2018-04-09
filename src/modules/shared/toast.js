
import {call} from 'redux-saga/effects';
import { createAction } from '../../utils/reduxHelpers';
import { takeFirst } from '../../utils/sagaHelpers';
import Toast from 'react-native-root-toast';

function displayToast (message) {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
  });
}

export const showToast = createAction('SHOW_TOAST');

export function * watchShowToast () {
  yield takeFirst(showToast.getType(), workerShowToast);
}

function * workerShowToast (action) {
  const {message} = action.payload;
  yield call(displayToast, message);
}
