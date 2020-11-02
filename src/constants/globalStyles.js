import { StyleSheet } from 'react-native';

import colors from './colors';

import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  baseFlex: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseFlexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  baseButton: {
    height: 40,
    marginBottom: hp(1.65),
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(6),
    width: '80%',
  },
  baseButtonText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: '500',
  },
  baseInput: {
    height: 40,
    marginHorizontal: wp(4.8),
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: wp(2.4),
    marginBottom: hp(2.2),
    width: '80%',
    borderColor: colors.grey,
  },
  baseBubble: {
    backgroundColor: colors.lightGrey,
    borderRadius: 500
  }
});
