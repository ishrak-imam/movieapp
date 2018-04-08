
import React from 'react';
import {TouchableOpacity, Icon} from '@shoutem/ui';

const LeftButton = ({navigator}) => (
  <TouchableOpacity onPress={() => {
    navigator.toggleDrawer({
      side: 'left',
      animated: true,
      to: 'open'
    });
  }}>
    <Icon name='sidebar' />
  </TouchableOpacity>
);

export default LeftButton;
