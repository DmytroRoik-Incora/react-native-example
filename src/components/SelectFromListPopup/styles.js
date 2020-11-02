import { StyleSheet } from 'react-native';

import { colors } from '../../constants';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
  
export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    alignItems: 'center',
    height: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: hp(4.4),
  },
  inputsWrapper: {
    marginBottom: hp(3.3),
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between'
  },
  input: {
    width: '48%',
    marginHorizontal: 0,
    marginBottom: 0,
  },
  dropdownContainer: {
    width: '48%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.grey,
    height: 40,
  },
  dropdownInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'transparent',
    height: 40,
    paddingHorizontal: wp(2.4),
  },
  dropdownInput: {
    fontSize: 14, 
    alignSelf: 'center'
  },
  flatListContainer: {
    width: '100%'
  },
  finishButton: {
    backgroundColor: colors.lightGreen,
    width: '90%',
    marginTop: 5,
    marginBottom: hp(4.4),
  },
});