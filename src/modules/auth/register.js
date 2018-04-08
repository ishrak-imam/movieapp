
import React, {Component} from 'react';
import {Screen, View, ScrollView} from '@shoutem/ui';
import {connect} from 'react-redux';
import Form from '../shared/forms';
import {REGISTER_FORM} from '../shared/forms/config';
import {bindFunctions} from '../../utils';
import {registerReq} from './action';
import {getRegister} from './store';

class Register extends Component {
  constructor (props) {
    super(props);
    bindFunctions.call(this, [
      '_register'
    ]);
  }

  _register (obj) {
    this.props.dispatch(registerReq(obj));
  }

  render () {
    const {register} = this.props;
    return (
      <Screen styleName='paper'>
        <View styleName='vertical h-center' style={{flex: 1}}>
          <ScrollView
            keyboardShouldPersistTaps='always'
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 10}}
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
  register: getRegister(state)
});

export default connect(stateToProps, dispatch => ({dispatch}))(Register);
