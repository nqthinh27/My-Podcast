import React from 'react';
import { View } from 'react-native';

const EmptyImage = (props) => {
  const { style } = props;
  return <View style={[{ backgroundColor: 'transparent' }, style]} />;
};

export default EmptyImage;