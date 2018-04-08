
import {call} from 'redux-saga/effects';
import { createAction } from '../utils/reduxHelpers';
import { takeFirst } from '../utils/sagaHelpers';
import {navigate} from '../navigation/service';

export const navigateToScene = createAction('NAVIGATE_TO_SCENE');

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
