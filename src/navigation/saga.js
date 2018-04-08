
import { createAction } from '../utils/reduxHelpers';
import { takeFirst } from '../utils/sagaHelpers';
import { Navigator } from 'react-native-navigation';

const getNavInstance = (navInfo) => {
  const {navigatorID, navigatorEventID, screenInstanceID} = navInfo;
  return new Navigator(navigatorID, navigatorEventID, screenInstanceID);
};

export const pushScene = createAction('PUSH_SCENE');
export const popScene = createAction('POP_SCENE');
export const resetToScene = createAction('RESET_TO_SCENE');
export const popToRoot = createAction('POP_TO_ROOT');
export const showModal = createAction('SHOW_MODAL');

const navActions = [
  pushScene.getType(),
  popScene.getType(),
  resetToScene.getType(),
  popToRoot.getType(),
  showModal.getType()
];

export function * watchNavActions () {
  yield takeFirst(navActions, navigationWorker);
}

function * navigationWorker (action) {
  const {scene, navInfo} = action.payload;
  const nav = getNavInstance(navInfo);
  switch (action.type) {
    case 'PUSH_SCENE':
      return nav.push(scene);
    case 'POP_SCENE':
      return nav.pop();
    case 'RESET_TO_SCENE':
      return nav.resetTo(scene);
    case 'POP_TO_ROOT':
      return nav.popToRoot();
    case 'SHOW_MODAL':
      return nav.showModal(scene);
  }
}
