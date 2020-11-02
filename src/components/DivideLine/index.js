import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default DivideLine = ({ lineText, lineStyle, lineStyleText }) => 
  <View style={[styles.line, lineStyle]}>
    <Text style={[styles.lineText, lineStyleText]}>{lineText}</Text>
  </View>