import { StyleSheet } from 'react-native';

import { colors } from '../../constants';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  line: {
    borderBottomWidth: 0.5,
    borderColor: colors.grey,
    marginBottom: hp(3.85),
    marginTop: hp(2.2),
    position: 'relative',
    width: '80%',
  },
  lineText: {
    alignSelf: 'center',
    backgroundColor: colors.white,
    color: colors.grey,
    fontSize: 16,
    position: 'absolute',
    textAlign: 'center',
    top: -9,
    width: wp(8.4),
  },
});