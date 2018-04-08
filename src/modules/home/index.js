
import React, {Component} from 'react';
import {
  Screen, Tile, Button,
  Text
} from '@shoutem/ui';

import {connect} from 'react-redux';
import {logoutReq} from '../auth/action';

class Home extends Component {
  render () {
    return (
      <Screen>
        <Tile styleName='text-centric'>
          <Button onPress={() => this.props.dispatch(logoutReq())}>
            <Text>Logout</Text>
          </Button>
        </Tile>
      </Screen>
    );
  }
}

export default connect(null, dispatch => ({dispatch}))(Home);
