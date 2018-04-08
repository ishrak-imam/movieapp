import React from 'react';
import Spinner from 'react-native-spinkit';
import {baseColor} from '../../utils/theme';

const Loader = ({ visible, size, color, type }) => (
  <Spinner
    isVisible={visible}
    size={size || 50}
    color={color || baseColor}
    type={type || 'ThreeBounce'}
  />
);

export default Loader;
