
import {call, put} from 'redux-saga/effects';
import {takeFirst} from '../../utils/sagaHelpers';
import {delay} from 'redux-saga';
import {
  getPayloadFromJwt,
  storeToken, getToken, removeToken
} from '../../utils';
import {
  init,
  loginReq, loginSucs, loginFail,
  getUser, getUserSucs, getUserFail,
  registerReq, registerSucs, registerFail,
  logoutReq, logoutSucs
} from './action';
import {showToast} from '../toast/action';
import {navigateToScene} from '../../navigation/action';
import {registerRequest, loginRequest, getUserData} from '../../api';

export function * watchInit () {
  yield takeFirst(init.getType(), workerInit);
}

function * workerInit () {
  try {
    const jwt = yield call(getToken);
    const {userId} = getPayloadFromJwt(jwt);
    yield put(loginSucs({jwt, userId}));
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
    yield put(showToast({message: e.message}));
  }
}

export function * watchGetUser () {
  yield takeFirst(getUser.getType(), workerGetUser);
}

function * workerGetUser (action) {
  try {
    yield delay(0);
    const {userId, jwt} = action.payload;
    const user = yield call(getUserData, userId, jwt);
    yield put(getUserSucs(user));
  } catch (e) {
    yield put(getUserFail(e));
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
    yield put(showToast({message: e.message}));
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
