
import React, {Component} from 'react';
import {Screen, View, Button, Text} from '@shoutem/ui';
import {
  Animated, Keyboard, Platform,
  KeyboardAvoidingView
} from 'react-native';
import images from '../../utils/staticImages';
// import BottomButton from '../shared/bottomButton';
import {connect} from 'react-redux';
import Form from '../shared/form';
import Loader from '../shared/loader';
import {LOGIN_FORM} from '../shared/form/config';
import {bindFunctions} from '../../utils';
import {loginReq, facebookLoginReq} from './action';
import {getLogin} from './selector';
import {getConnection} from '../../utils/selector';
import {navigateToScene} from '../../navigation/action';
import {
  networkActionDispatcher,
  genericActionDispatcher
} from '../../utils/actionDispatcher';

class Signin extends Component {
  constructor (props) {
    super(props);
    bindFunctions.call(this, [
      '_logoResize',
      '_register', '_login',
      '_onKbrdShow', '_onKbrdHide',
      '_facebookLogin'
    ]);

    this.logoDim = new Animated.Value(100);
    this.radius = new Animated.Value(50);
    this.kbrdShow = Keyboard.addListener('keyboardDidShow', this._onKbrdShow);
    this.kbrdHide = Keyboard.addListener('keyboardDidHide', this._onKbrdHide);
  }

  componentWillUnmount () {
    this.kbrdShow.remove();
    this.kbrdHide.remove();
  }

  _logoResize (isKbrdOpen) {
    Animated.timing(
      this.logoDim,
      {
        toValue: isKbrdOpen ? 50 : 100,
        duration: 300
      }
    ).start();
    Animated.timing(
      this.radius,
      {
        toValue: isKbrdOpen ? 25 : 50,
        duration: 300
      }
    ).start();
  }

  _onKbrdShow () {
    this._logoResize(true);
  }

  _onKbrdHide () {
    this._logoResize(false);
  }

  _login (obj) {
    Keyboard.dismiss();
    const {dispatch, connection} = this.props;
    networkActionDispatcher(
      dispatch,
      loginReq({
        email: obj.get('email'),
        password: obj.get('password'),
        strategy: 'local'
      }),
      connection);
  }

  _register () {
    const {dispatch} = this.props;
    genericActionDispatcher(dispatch, navigateToScene({routeName: 'Register'}));
  }

  _facebookLogin () {
    const {dispatch, connection} = this.props;
    networkActionDispatcher(dispatch, facebookLoginReq(), connection);
  }

  render () {
    const {login} = this.props;
    return (
      <Screen styleName='paper' style={{flex: 1}}>
        <KeyboardAvoidingView
          {...Platform.select({ios: {behavior: 'padding'}, android: {}})}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        >
          <View styleName='vertical h-center v-end' style={{flex: 1, paddingBottom: 30}}>
            <Animated.Image
              style={{
                alignSelf: 'center',
                height: this.logoDim,
                width: this.logoDim,
                borderRadius: this.radius
              }}
              source={images.logo}
            />
          </View>
          <View styleName='vertical h-center' style={{flex: 2}}>
            <Form
              key={LOGIN_FORM.name}
              loading={login.get('loading')}
              onSubmit={this._login}
              config={LOGIN_FORM}
            />
            <View style={{marginTop: 20}}>
              {
                login.get('fbLoading')
                  ? <View style={{alignItems: 'center'}}>
                    <Loader visible size={40} />
                  </View>
                  : <Button
                    styleName={'secondary auth'}
                    onPress={this._facebookLogin}
                  >
                    <Text>FACEBOOK</Text>
                  </Button>
              }
            </View>
            <View style={{marginTop: 20}}>
              <Button
                styleName={'secondary auth'}
                onPress={this._register}
              >
                <Text>Create New Account</Text>
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Screen>
    );
  }
}

const stateToProps = state => ({
  login: getLogin(state),
  connection: getConnection(state)
});

export default connect(stateToProps, dispatch => ({dispatch}))(Signin);
