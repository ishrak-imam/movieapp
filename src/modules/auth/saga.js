
import {call, put} from 'redux-saga/effects';
import {takeFirst} from '../../utils/sagaHelpers';
import {
  getPayloadFromJwt,
  storeToken, getToken, removeToken
} from '../../utils';
import {
  init,
  loginReq, loginSucs, loginFail,
  registerReq, registerSucs, registerFail,
  logoutReq, logoutSucs
} from './action';
import {navigateToScene} from '../../navigation/saga';
import {registerRequest, loginRequest, getUser} from '../../api';

export function * watchInit () {
  yield takeFirst(init.getType(), workerInit);
}

function * workerInit () {
  try {
    const accessToken = yield call(getToken);
    const {userId} = getPayloadFromJwt(accessToken);
    const user = yield call(getUser, userId, accessToken);
    user.token = accessToken;
    yield put(loginSucs(user));
    yield put(navigateToScene({routeName: 'App'}));
  } catch (e) {
    yield put(navigateToScene({routeName: 'Auth'}));
  }
}

export function * watchLogin () {
  yield takeFirst(loginReq.getType(), workerLogin);
}

function * workerLogin (action) {
  try {
    const {accessToken} = yield call(loginRequest, action.payload);
    yield call(storeToken, accessToken);
    yield put(init());
  } catch (e) {
    yield put(loginFail(e));
  }
}

export function * watchRegister () {
  yield takeFirst(registerReq.getType(), workerRegister);
}

function * workerRegister (action) {
  try {
    const response = yield call(registerRequest, action.payload);
    yield put(registerSucs(response));
    const {email, password} = action.payload;
    const loginObj = {
      email,
      password,
      strategy: 'local'
    };
    yield put(loginReq(loginObj));
  } catch (e) {
    yield put(registerFail(e));
  }
}

export function * watchLogout () {
  yield takeFirst(logoutReq.getType(), workerLogout);
}

function * workerLogout () {
  yield call(removeToken);
  yield put(logoutSucs());
  yield put(init());
}
