
import React, {Component} from 'react';
import {
  Screen, Tile, Button,
  Text
} from '@shoutem/ui';

import {connect} from 'react-redux';
import {getUser, logoutReq} from '../auth/action';
import {getLogin} from '../auth/store';
import {bindFunctions} from '../../utils';
import {navigateToScene} from '../../navigation/action';
import {genericActionDispatcher} from '../../utils/actionDispatcher';

class Home extends Component {
  constructor (props) {
    super(props);
    bindFunctions.call(this, [
      '_getUser', '_logOut',
      '_toUsers'
    ]);
  }

  componentDidMount () {
    this._getUser();
  }

  _getUser () {
    const token = this.props.login.get('token');
    this.props.dispatch(getUser({
      userId: token.get('userId'),
      jwt: token.get('jwt')
    }));
  }

  _logOut () {
    this.props.dispatch(logoutReq());
  }

  _toUsers () {
    const {dispatch} = this.props;
    genericActionDispatcher(dispatch, navigateToScene({routeName: 'Users'}));
  }

  render () {
    const user = this.props.login.get('user');
    return (
      <Screen>
        <Tile styleName='text-centric'>
          <Text>Name: {user.get('name')}</Text>
        </Tile>
        <Tile styleName='text-centric'>
          <Button onPress={this._toUsers} style={{borderWidth: 1, borderColor: '#000', borderRadius: 20, width: 100}}>
            <Text>Users</Text>
          </Button>
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
