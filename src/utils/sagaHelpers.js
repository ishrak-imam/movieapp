
import {fork, call, take} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';

export const takeFirst = (patternOrChannel, saga, ...args) => fork(function * () {
  while (true) {
    const action = yield take(patternOrChannel);
    yield call(saga, ...args.concat(action));
  }
});

export const eventEmitterChannel = (emitter, methods, eventName) => {
  return eventChannel(notifire => {
    emitter[methods.on](eventName, notifire);
    return () => emitter[methods.off](eventName, notifire);
  });
};
