import { StyleSheet } from 'react-native';

import { globalStyles } from '../../constants';

export default StyleSheet.create({
  button: {
    ...globalStyles.baseButton,
  },
  disabled: {
    opacity: 0.6
  },
  textWrapper: {
    flex: 3,
  },
  buttonText: {
    ...globalStyles.baseButtonText,
  },
  icon: {
    width: 25,
    height: 25,
  },
  activityIndicator: {
    marginLeft: 5,
  },
});