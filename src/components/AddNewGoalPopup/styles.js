import { StyleSheet, Dimensions } from 'react-native';

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
    paddingTop: hp(4.5),
  },
  inputsWrapper: {
    width: '90%',
  },
  input: {
    width: '100%',
    marginHorizontal: 0,
  },
  dropdownContainer: {
    width: '100%',
    backgroundColor: colors.white,
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
    paddingHorizontal: wp(2.5),
  },
  dropdownInput: {
    fontSize: 14,
    alignSelf: 'center'
  },
  checkBoxesContainer: {
    width: '90%',
    paddingVertical: hp(1.7),
  },
  checkBoxContainer: {
    marginVertical: 5
  },
  checkBoxText: {
    padding: 0,
    margin: 0,
    fontSize: 13,
    fontWeight: '500'
  },
  settings: {
    width: '90%',
  },
  settingsLine: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  settingsNumberInput: {
    marginHorizontal: 0,
    width: '20%',
  },
  settingsTextField: {
    marginHorizontal: 0,
    width: '35%',
  },
  titles: {
    alignSelf: 'flex-start',
    marginTop: hp(2.2),
    marginVertical: hp(1.1),
    marginLeft: wp(5),
  },
  connectButton: {
    backgroundColor: '#4D4022',
    width: '90%',
    marginTop: hp(0.55),
    marginBottom: 0,
  },
  finishButton: {
    backgroundColor: colors.lightGreen,
    width: '90%',
    marginTop: hp(0.55),
    marginBottom: hp(4.4),
    position: 'absolute',
    bottom: 0,
  },
});
