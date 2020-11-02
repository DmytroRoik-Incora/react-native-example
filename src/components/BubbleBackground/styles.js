import { StyleSheet } from 'react-native';

import { globalStyles } from '../../constants';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: -20,
    zIndex: -10,
  },
  bigBubble: {
    ...globalStyles.baseBubble,
    position: 'relative',
    top: 5,
    left: -120,
    width: 330,
    height: 330
  },
  smallBubble: {
    ...globalStyles.baseBubble,
    position: 'relative',
    left: 150,
    width: 150,
    height: 150
  }
});