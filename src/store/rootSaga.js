
import { fork, all } from 'redux-saga/effects';

import * as connectionSaga from '../modules/network/saga';
import * as toastSaga from '../modules/toast';
import * as navSaga from '../navigation/saga';
import * as authSaga from '../modules/auth/saga';
import * as userSaga from '../modules/users/saga';

const sagas = {
  ...connectionSaga,
  ...toastSaga,
  ...navSaga,
  ...authSaga,
  ...userSaga
};

const forkedSagas = Object.keys(sagas).map(key => fork(sagas[key]));

export default function * rootSaga () {
  yield all(forkedSagas);
}
