import { StyleSheet } from 'react-native';

import colors from '../../constants/colors';

export default StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    padding: 15
  },
  iconWrapper: {
    backgroundColor: colors.white,
    borderRadius: 500,
    padding: 15,
  },
  icon: {
    width: 15,
    height: 15
  }
});