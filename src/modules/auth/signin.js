
import React, {Component} from 'react';
import {Screen, View} from '@shoutem/ui';
import {
  Animated, Keyboard, Platform,
  KeyboardAvoidingView
} from 'react-native';
import BottomButton from '../shared/bottomButton';
import {connect} from 'react-redux';
import Form from '../shared/form';
import {LOGIN_FORM} from '../shared/form/config';
import {bindFunctions} from '../../utils';
import {loginReq} from './action';
import {getLogin} from './store';
import {navigateToScene} from '../../navigation/action';

import FBSDK from 'react-native-fbsdk';
const {LoginManager, AccessToken} = FBSDK;

class Signin extends Component {
  constructor (props) {
    super(props);
    bindFunctions.call(this, [
      '_logoResize', '_login',
      '_register',
      '_onKbrdShow', '_onKbrdHide'
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
    obj.strategy = 'local';
    this.props.dispatch(loginReq(obj));
  }

  _register () {
    // this.props.dispatch(navigateToScene({
    //   routeName: 'Register'
    // }));

    LoginManager.logInWithReadPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(result);
          AccessToken.getCurrentAccessToken().then(data => {
            console.log(data);
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      }
    );
  }

  render () {
    const {login} = this.props;
    return (
      <Screen styleName='paper'>
        <View style={{flex: 11}}>
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
                source={require('../../images/logo.png')}
              />
            </View>
            <View styleName='vertical h-center' style={{flex: 2}}>
              <Form
                key={LOGIN_FORM.name}
                loading={login.loading}
                onSubmit={this._login}
                config={LOGIN_FORM}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
        <View style={{flex: 1}}>
          <BottomButton text='Create new account' onPress={this._register} />
        </View>
      </Screen>
    );
  }
}

const stateToProps = state => ({
  login: getLogin(state)
});

export default connect(stateToProps, dispatch => ({dispatch}))(Signin);

// import React from 'react';
// import {
//   TouchableOpacity, View, Text,
//   FlatList
// } from 'react-native';

// class MyListItem extends React.Component {
//   constructor () {
//     super();
//     this._onPress = this._onPress.bind(this);
//   }
//   _onPress () {
//     this.props.onPressItem(this.props.id);
//   }

//   shouldComponentUpdate (nextProps) {
//     return nextProps.selected !== this.props.selected;
//   }

//   render () {
//     const backgroundColor = `${this.props.selected ? 'limegreen' : 'white'}`;
//     return (
//       <TouchableOpacity onPress={this._onPress}>
//         <View style={{height: 50, width: 200, padding: 10, borderWidth: 1, backgroundColor}}>
//           <Text>
//             {this.props.title}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   }
// }

// export default class MultiSelectList extends React.Component {
//   constructor () {
//     super();
//     let data = [];
//     for (let i = 1; i <= 100; i++) {
//       data.push({id: i, title: `title for ${i}`});
//     }
//     this.state = {
//       data,
//       selected: 1
//     };
//     this._keyExtractor = this._keyExtractor.bind(this);
//     this._onPressItem = this._onPressItem.bind(this);
//     this._renderItem = this._renderItem.bind(this);
//   }

//   _keyExtractor (item) {
//     return item.id.toString();
//   }

//   _onPressItem (id) {
//     this.setState({selected: id});
//   }

//   _renderItem ({item}) {
//     return (
//       <MyListItem
//         id={item.id}
//         onPressItem={this._onPressItem}
//         selected={item.id === this.state.selected}
//         title={item.title}
//       />
//     );
//   }

//   render () {
//     return (
//       <View style={{paddingLeft: 20}}>
//         <FlatList
//           data={this.state.data}
//           extraData={this.state}
//           keyExtractor={this._keyExtractor}
//           renderItem={this._renderItem}
//         />
//       </View>
//     );
//   }
// }
