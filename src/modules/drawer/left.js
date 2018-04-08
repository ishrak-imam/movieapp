
import React, {Component} from 'react';
import {Screen, Tile, Text} from '@shoutem/ui';

export default class LeftDrawer extends Component {
  render () {
    return (
      <Screen>
        <Tile style={{backgroundColor: 'dodgerblue'}} styleName='text-centric'>
          <Text>Drawer</Text>
        </Tile>
      </Screen>
    );
  }
}
