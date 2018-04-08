
const SHOW_REDUX_FORM_ACTIONS = false;

const reduxFormActions = (actionName) => {
  const regex = /redux-form/;
  return SHOW_REDUX_FORM_ACTIONS ? false : regex.test(actionName);
};

const logger = store => next => action => {
  const result = next(action);
  if (!reduxFormActions(action.type)) {
    console.log('%c DISPATCHING      :: ', 'color: green', action);
    console.log('%c NEXT STATE       :: ', 'color: green', store.getState());
  }
  return result;
};

export default logger;
