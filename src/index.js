import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Application from './navigation';
import store from './store';
import {setNavigator} from './navigation/service';

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Application ref={navigatorRef => setNavigator(navigatorRef)} />
      </Provider>
    );
  }
}
