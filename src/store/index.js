import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';

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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
)

sagaMiddleware.run(rootSaga)
export default store
