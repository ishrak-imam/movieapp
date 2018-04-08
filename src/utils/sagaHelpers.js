
import {fork, call, take} from 'redux-saga/effects';

export const takeFirst = (patternOrChannel, saga, ...args) => fork(function * () {
  while (true) {
    const action = yield take(patternOrChannel);
    yield call(saga, ...args.concat(action));
  }
});
