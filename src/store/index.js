import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';

import {getInitialState} from '../utils/initialState';

import Logger from '../middlewares/logger';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

/* eslint-disable */
if (__DEV__) {
  middlewares.push(Logger);
}
/* eslint-disable */

const store = createStore(
  rootReducer,
  getInitialState(),
  applyMiddleware(...middlewares)
)

sagaMiddleware.run(rootSaga)
export default store
