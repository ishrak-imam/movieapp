
import React, {Component} from 'react';
import {
  Screen, Tile, Button,
  Text
} from '@shoutem/ui';

import {connect} from 'react-redux';
import {getUser, logoutReq} from '../auth/action';
import {getLogin} from '../auth/store';
import {bindFunctions} from '../../utils';

class Home extends Component {
  constructor (props) {
    super(props);
    bindFunctions.call(this, [
      '_getUser', '_logOut'
    ]);
  }

  componentDidMount () {
    this._getUser();
  }

  _getUser () {
    const {login} = this.props;
    const userId = login.getIn(['token', 'userId']);
    const jwt = login.getIn(['token', 'jwt']);
    this.props.dispatch(getUser({userId, jwt}));
  }

  _logOut () {
    this.props.dispatch(logoutReq());
  }

  render () {
    const {login} = this.props;
    return (
      <Screen>
        <Tile styleName='text-centric'>
          <Text>Name: {login.getIn(['user', 'name'])}</Text>
        </Tile>
        <Tile styleName='text-centric'>
          <Button onPress={this._logOut} style={{borderWidth: 1, borderColor: '#000', borderRadius: 20, width: 100}}>
            <Text>Logout</Text>
          </Button>
        </Tile>
      </Screen>
    );
  }
}

const stateToProps = state => ({
  login: getLogin(state)
});

export default connect(stateToProps, dispatch => ({dispatch}))(Home);
