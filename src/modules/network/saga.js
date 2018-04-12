
import {NetInfo} from 'react-native';
import {call, put, takeEvery} from 'redux-saga/effects';
import {takeFirst, eventEmitterChannel} from '../../utils/sagaHelpers';

import {
  checkConnection, connectionStatus,
  startConnectionMonitor, connectionType
} from './action';
import {showToast} from '../toast/action';
import {init} from '../auth/action';

function checkIfConnected () {
  return NetInfo.isConnected.fetch();
}

export function * watchCheckConnection () {
  yield takeFirst(checkConnection.getType(), workerCheckConnection);
}

function * workerCheckConnection () {
  const connected = yield call(checkIfConnected);
  yield put(connectionStatus(connected));
  yield put(showToast({
    message: `Network ${connected ? 'connected' : 'disconnected'}`
  }));
  yield put(init());
}

export function * watchConnection () {
  yield takeFirst(startConnectionMonitor.getType(), createConnectionSubscription);
}

function * createConnectionSubscription (action) {
  const connectionChannel = yield call(
    eventEmitterChannel,
    NetInfo,
    {on: 'addEventListener', off: 'removeEventListener'},
    'connectionChange'
  );
  yield takeEvery(connectionChannel, function * (connection) {
    yield put(connectionType(connection.type));
    yield put(checkConnection());
  });
}
