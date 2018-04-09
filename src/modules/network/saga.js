
import {NetInfo} from 'react-native';
import {call, put} from 'redux-saga/effects';
import {takeFirst} from '../../utils/sagaHelpers';

import {
  checkConnection, connectionStatus
} from './action';

function checkIfConnected () {
  return NetInfo.isConnected.fetch();
}

export function * watchCheckConnection () {
  yield takeFirst(checkConnection.getType(), workerCheckConnection);
}

function * workerCheckConnection () {
  const isConnected = yield call(checkIfConnected);
  yield put(connectionStatus(isConnected));
}
