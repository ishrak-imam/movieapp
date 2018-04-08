
import React, {Component} from 'react';
import {
  Screen, View
} from '@shoutem/ui';
import Loader from '../shared/loader';

export default class LoadingScreen extends Component {
  constructor (props) {
    super(props);
    setTimeout(() => {
      props.navigation.navigate('Auth');
    }, 2000);
  }
  render () {
    return (
      <Screen styleName='paper'>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Loader visible />
        </View>
      </Screen>
    );
  }
}
