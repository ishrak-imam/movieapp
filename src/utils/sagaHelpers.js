
import {fork, call, take} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';

export const takeFirst = (patternOrChannel, saga, ...args) => fork(function * () {
  while (true) {
    const action = yield take(patternOrChannel);
    yield call(saga, ...args.concat(action));
  }
});

export function eventEmitterChannel (emitter, methods, type) {
  return eventChannel((emit) => {
    emitter[methods.on](type, emit);
    return () => emitter[methods.off](type, emit);
  });
}
