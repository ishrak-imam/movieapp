
const SHOW_REDUX_FORM_ACTIONS = false;

const reduxFormActions = (actionName) => {
  const regex = /redux-form/;
  return SHOW_REDUX_FORM_ACTIONS ? false : regex.test(actionName);
};

const logger = store => next => action => {
  const result = next(action);
  if (!reduxFormActions(action.type)) {
    console.groupCollapsed('%c action', 'color: grey  ', action.type);
    console.log('%c DISPATCH  :: ', 'color: green', action);
    console.log('%c NXTSTATE  :: ', 'color: green', store.getState());
    console.groupEnd();
  }
  return result;
};

export default logger;
