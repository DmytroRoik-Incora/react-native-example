import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import cancelIcon from '../../assets/cancel-icon.png';
import styles from './styles';

export default CancelButton = ({ onPress, bgColor, componentStyles }) => (
  <TouchableOpacity 
    style={styles.container}
    onPress={onPress}
  >
    <View style={[
      styles.iconWrapper,
      componentStyles,
      bgColor && { backgroundColor: bgColor }
    ]}>
      <Image 
        style={styles.icon}
        source={cancelIcon}
      />
    </View>
  </TouchableOpacity>
)