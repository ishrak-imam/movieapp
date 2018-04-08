
import { NavigationActions } from 'react-navigation';
let _navigator = null;

export function setNavigator (navigator) {
  _navigator = navigator;
}

export function navigate (routeName, params = {}) {
  _navigator.dispatch(NavigationActions.navigate({
    routeName, params
  }));
}
