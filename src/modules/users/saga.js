
import {call, put} from 'redux-saga/effects';
import {takeFirst} from '../../utils/sagaHelpers';
import {getImmutableObject} from '../../utils/immutable';

import {
  userGetReq,
  userGetSucs,
  userGetFail
} from './action';

import {getUsers} from './api';

const formatUsers = users => {
  let temp = {};
  let idList = [];

  temp.listById = users.results.reduce((map, item) => {
    idList.push(item.login.uuid);
    map[item.login.uuid] = getImmutableObject({
      id: item.login.uuid,
      name: item.name,
      email: item.email,
      picture: item.picture
    });
    return map;
  }, {});

  temp.ids = idList;
  temp.metadata = users.info;
  return temp;
};

export function * watchUserGetReq () {
  yield takeFirst(userGetReq.getType(), workerUserGetReq);
}

function * workerUserGetReq (action) {
  try {
    const {payload} = action;
    let users = yield call(getUsers, payload);
    yield put(userGetSucs(formatUsers(users)));
  } catch (e) {
    yield put(userGetFail);
  }
}
