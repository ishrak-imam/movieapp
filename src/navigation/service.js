
import { NavigationActions } from 'react-navigation';
let _navigator = null;

export const setNavigator = navigator => {
  _navigator = navigator;
};

export const navigate = (routeName, params = {}) => {
  _navigator.dispatch(NavigationActions.navigate({
    routeName, params
  }));
};
