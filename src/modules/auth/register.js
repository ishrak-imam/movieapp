
import React, {Component} from 'react';
import {Screen, View, ScrollView} from '@shoutem/ui';
import {Keyboard} from 'react-native';
import {connect} from 'react-redux';
import Form from '../shared/form';
import {REGISTER_FORM} from '../shared/form/config';
import {bindFunctions} from '../../utils';
import {registerReq} from './action';
import {getRegister, getConnection} from './store';
import {networkActionDispatcher} from '../../utils/actionDispatcher';

class Register extends Component {
  constructor (props) {
    super(props);
    bindFunctions.call(this, [
      '_register'
    ]);
  }

  _register (obj) {
    Keyboard.dismiss();
    const {firstName, lastName, email, password} = obj;
    const {dispatch, connection} = this.props;
    networkActionDispatcher(
      dispatch,
      registerReq({
        name: `${firstName} ${lastName}`,
        email,
        password,
        strategy: 'local'
      }),
      connection
    );
  }

  render () {
    const {register} = this.props;
    return (
      <Screen styleName='paper'>
        <View styleName='vertical h-center' style={{flex: 1}}>
          <ScrollView
            keyboardShouldPersistTaps='always'
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingVertical: 30}}
          >
            <Form
              key={REGISTER_FORM.name}
              loading={register.loading}
              onSubmit={this._register}
              config={REGISTER_FORM}
            />
          </ScrollView>
        </View>
      </Screen>
    );
  }
}

const stateToProps = state => ({
  register: getRegister(state),
  connection: getConnection(state)
});

export default connect(stateToProps, dispatch => ({dispatch}))(Register);
