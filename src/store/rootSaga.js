
import { fork, all } from 'redux-saga/effects';

import * as toastSaga from '../modules/shared/toast';
import * as navSaga from '../navigation/saga';
import * as authSaga from '../modules/auth/saga';

const sagas = {
  ...toastSaga,
  ...navSaga,
  ...authSaga
};

const forkedSagas = Object.keys(sagas).map(key => fork(sagas[key]));

export default function * rootSaga () {
  yield all(forkedSagas);
}
