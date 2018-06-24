
import React, {Component} from 'react';
import {Screen, View, Button, Text} from '@shoutem/ui';
import {
  Animated, Keyboard, Platform,
  KeyboardAvoidingView
} from 'react-native';
import BottomButton from '../shared/bottomButton';
import {connect} from 'react-redux';
import Form from '../shared/form';
import Loader from '../shared/loader';
import {LOGIN_FORM} from '../shared/form/config';
import {bindFunctions} from '../../utils';
import {loginReq, facebookLoginReq} from './action';
import {getLogin, getConnection} from './store';
import {navigateToScene} from '../../navigation/action';
import {
  networkActionDispatcher,
  genericActionDispatcher
} from '../../utils/actionDispatcher';

class Signin extends Component {
  constructor (props) {
    super(props);
    bindFunctions.call(this, [
      '_logoResize', '_login',
      '_register',
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
                      <Text>Facebook</Text>
                    </Button>
                }
              </View>
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
  login: getLogin(state),
  connection: getConnection(state)
});

export default connect(stateToProps, dispatch => ({dispatch}))(Signin);

// import React from 'react';
// import {
//   // TouchableOpacity, View, Text,
//   FlatList
// } from 'react-native';

// import {
//   Row, Image, View, Subtitle, Caption,
//   TouchableOpacity, Divider, Tile
// } from '@shoutem/ui';

// import Loader from '../shared/loader';

// class MyListItem extends React.Component {
//   constructor () {
//     super();
//     this._onPress = this._onPress.bind(this);
//   }

//   _onPress () {
//     this.props.onPressItem(this.props.item.phone);
//   }

//   shouldComponentUpdate (nextProps) {
//     return nextProps.selected !== this.props.selected;
//   }

//   render () {
//     const backgroundColor = `${this.props.selected ? 'limegreen' : 'white'}`;
//     const {name, picture, email} = this.props.item;
//     return (
//       <TouchableOpacity onPress={this._onPress}>
//         <Row style={{backgroundColor}}>
//           <Image
//             styleName='small-avatar top'
//             source={{ uri: picture.thumbnail }}
//           />
//           <View styleName='vertical'>
//             <View styleName='horizontal space-between'>
//               <Subtitle>{name.first}</Subtitle>
//               <Caption>{email}</Caption>
//             </View>
//           </View>
//         </Row>
//       </TouchableOpacity>
//     );
//   }
// }

// export default class MultiSelectList extends React.Component {
//   constructor () {
//     super();
//     this.state = {
//       results: [],
//       page: 0,
//       loading: false,
//       refreshing: false,
//       selected: null
//     };

//     this._keyExtractor = this._keyExtractor.bind(this);
//     this._onPressItem = this._onPressItem.bind(this);
//     this._renderItem = this._renderItem.bind(this);
//     this._itemSeparator = this._itemSeparator.bind(this);
//     this._makeRequest = this._makeRequest.bind(this);
//     this._loadMore = this._loadMore.bind(this);
//     this._onRefresh = this._onRefresh.bind(this);
//   }

//   _makeRequest () {
//     console.log('NEW REQ FOR PAGE ::: ', this.state.page);
//     fetch('https://randomuser.me/api/?page=1&results=20')
//       .then(response => response.json())
//       .then(data => {
//         this.setState({
//           loading: false,
//           refreshing: false,
//           results: this.state.page === 1 ? data.results : [...this.state.results, ...data.results]
//         }, () => console.log(this.state.results));
//       });
//   }

//   componentDidMount () {
//     this.setState({
//       loading: true,
//       page: this.state.page + 1
//     }, this._makeRequest);
//   }

//   _keyExtractor (item) {
//     return item.phone;
//   }

//   _onPressItem (phone) {
//     this.setState({selected: phone});
//   }

//   _renderItem ({item}) {
//     return (
//       <MyListItem
//         onPressItem={this._onPressItem}
//         selected={item.phone === this.state.selected}
//         item={item}
//       />
//     );
//   }

//   _itemSeparator () {
//     return (
//       <Divider styleName='line' />
//     );
//   }

//   _loadMore () {
//     this.setState({
//       // loading: true,
//       page: this.state.page + 1
//     }, this._makeRequest);
//   }

//   _onRefresh () {
//     this.setState({
//       refreshing: true,
//       page: 1
//       // results: []
//     }, this._makeRequest);
//   }

//   render () {
//     const {loading} = this.state;
//     return (
//       <View style={{padding: 20}}>
//         {
//           loading
//             ? <Tile styleName='text-centric'>
//               <Loader visible size={40} />
//             </Tile>
//             : <FlatList
//               data={this.state.results}
//               extraData={this.state.selected}
//               keyExtractor={this._keyExtractor}
//               renderItem={this._renderItem}
//               ItemSeparatorComponent={this._itemSeparator}
//               onEndReached={this._loadMore}
//               onRefresh={this._onRefresh}
//               refreshing={this.state.refreshing}
//               onEndReachedThreshold={0.9}
//             />
//         }
//       </View>
//     );
//   }
// }
