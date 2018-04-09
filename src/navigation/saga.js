
import {call} from 'redux-saga/effects';
import { takeFirst } from '../utils/sagaHelpers';
import {navigate} from '../navigation/service';

import {navigateToScene} from './action';

const navActions = [
  navigateToScene.getType()
];

export function * watchNavActions () {
  yield takeFirst(navActions, navigationWorker);
}

function * navigationWorker (action) {
  const {routeName, params} = action.payload;
  switch (action.type) {
    case 'NAVIGATE_TO_SCENE':
      yield call(navigate, routeName, params);
  }
}
