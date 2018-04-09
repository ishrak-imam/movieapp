
import {call} from 'redux-saga/effects';
import { takeFirst } from '../../utils/sagaHelpers';
import Toast from 'react-native-root-toast';

import {showToast} from './action';

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

export function * watchShowToast () {
  yield takeFirst(showToast.getType(), workerShowToast);
}

function * workerShowToast (action) {
  const {message} = action.payload;
  yield call(displayToast, message);
}
