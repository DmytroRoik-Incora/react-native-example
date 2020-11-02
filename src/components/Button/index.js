import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator
} from 'react-native';
import styles from './styles';

export default Button = ({ title, icon, style, textStyle, onPress, disabled, isLoading }) =>
  <TouchableOpacity
    style={[styles.button, style, disabled && styles.disabled]}
    onPress={onPress}
    disabled={disabled}
  >
    {icon && <Image
      style={styles.icon}
      source={icon}
    />}
    <View style={styles.textWrapper}>
      <Text style={[styles.buttonText, textStyle]}>
        {title}
      </Text>
      {isLoading && (
        <ActivityIndicator style={[styles.activityIndicator, style]} size="small" />
      )}
    </View>
  </TouchableOpacity>