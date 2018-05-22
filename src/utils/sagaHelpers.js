import { fork, call, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

export const takeFirst = (patternOrChannel, saga, ...args) => fork(function * () {
  while (true) {
    const action = yield take(patternOrChannel);
    yield call(saga, ...args.concat(action));
  }
});

export const eventEmitterChannel = (emitter, listeners, eventName) => {
  return eventChannel(notifier => {
    emitter[listeners.on](eventName, notifier);
    return () => emitter[listeners.off](eventName, notifier);
  });
};
