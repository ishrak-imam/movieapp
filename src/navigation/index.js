
import {StackNavigator, SwitchNavigator} from 'react-navigation';
import {connectTheme} from '../utils/theme';

import LoadingScreen from '../modules/auth/loadingScreen';
import Signin from '../modules/auth/signin';
import Register from '../modules/auth/register';
import Home from '../modules/home';

const authStack = StackNavigator(
  {
    Signin: {
      screen: connectTheme(Signin),
      navigationOptions: {
        header: null
      }
    },
    Register: {
      screen: connectTheme(Register),
      navigationOptions: {
        title: 'Register'
      }
    }
  },
  {
    initialRouteName: 'Signin',
    headerMode: 'screen'
  }
);

const appStack = StackNavigator(
  {
    Home: {
      screen: connectTheme(Home),
      navigationOptions: {
        title: 'Register'
      }
    }
  },
  {
    initialRouteName: 'LoadingScreen',
    headerMode: 'screen'
  }
);

const Navigator = SwitchNavigator(
  {
    AuthLoading: LoadingScreen,
    App: appStack,
    Auth: authStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

export default Navigator;
