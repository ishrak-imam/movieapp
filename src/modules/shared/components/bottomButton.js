
import React from 'react';
import {
  TouchableOpacity, Text, View
} from '@shoutem/ui';
import {StyleSheet} from 'react-native';

export default ({text, onPress}) => (
  <TouchableOpacity style={{flex: 1, borderTopWidth: StyleSheet.hairlineWidth}} onPress={onPress}>
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#efefef'}}>
      <Text>{text}</Text>
    </View>
  </TouchableOpacity>
);
