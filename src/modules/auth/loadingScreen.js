
import React, {Component} from 'react';
import {
  Screen, View
} from '@shoutem/ui';
import Loader from '../shared/loader';
import {connect} from 'react-redux';
import {init} from '../auth/action';

class LoadingScreen extends Component {
  componentDidMount () {
    this.props.dispatch(init());
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

export default connect(null, dispatch => ({dispatch}))(LoadingScreen);
