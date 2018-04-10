import React, {Component} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {getTheme} from '@shoutem/ui';
import {StyleProvider} from '@shoutem/theme';

const {width} = Dimensions.get('window');
const theme = getTheme();

export const baseColor = '#000000';
export const errorColor = '#a94442';
export const inputAndButtonHeight = 40;

const textInput = {
  borderBottomWidth: StyleSheet.hairlineWidth,
  width: width - 100,
  paddingVertical: 0,
  height: inputAndButtonHeight
};

const button = {
  width: width - 100,
  height: inputAndButtonHeight,
  borderWidth: 0
};

const authTextInput = textInput;
const authButton = button;

const errorText = {
  color: errorColor,
  fontSize: 13,
  marginTop: 7,
  marginLeft: 2
};

const customTheme = {
  ...theme,
  'shoutem.ui.Button': {
    ...theme['shoutem.ui.Button'],
    '.auth': authButton,
    '.disable': {
      backgroundColor: 'grey'
    }
  },
  'shoutem.ui.TextInput': {
    ...theme['shoutem.ui.TextInput'],
    '.auth': authTextInput
  },
  'text': {
    ...theme['text'],
    '.error': errorText
  }
};
console.log('CUSTOM THEME ::: ', customTheme);

export const connectTheme = Scene => {
  return class extends Component {
    render () {
      return (
        <StyleProvider style={customTheme}>
          <Scene {...this.props} />
        </StyleProvider>
      );
    }
  };
};
