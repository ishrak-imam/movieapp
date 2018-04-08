
import {StackNavigator} from 'react-navigation';
import {connectTheme} from '../utils/theme';

import Signin from '../modules/auth/signin';
import Register from '../modules/auth/register';

export default StackNavigator(
  {
    Signin: {
      screen: connectTheme(Signin)
    },
    Register: {
      screen: connectTheme(Register)
    }
  },
  {
    initialRouteName: 'Signin',
    headerMode: 'none'
  }
);
