import { StyleSheet, Dimensions } from 'react-native';

import { globalStyles, colors } from '../../constants';

const windowWidth = Dimensions.get('window').width;
const elementWidth = {
  width: '65%'
}

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { isIphoneX } from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: '100%',
    flex: 1,
  },
  setupWrapper: {
    backgroundColor: colors.yellow,
    height: '45%',
    width: windowWidth * 1.3,
    alignSelf: 'center',
    borderBottomLeftRadius: windowWidth,
    borderBottomRightRadius: windowWidth,
  },
  setupContainer: {
    ...globalStyles.baseFlex,
    width: windowWidth,
    height: '100%',
    alignSelf: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 30
  },
  selectButton: {
    ...elementWidth,
    backgroundColor: colors.orange,
  },
  addButton: {
    ...elementWidth,
    backgroundColor: colors.white,
  },
  addButtonText: {
    color: colors.orange
  },
  lineStyle: {
    ...elementWidth,
    borderColor: colors.white
  },
  lineStyleText: {
    color: colors.white,
    backgroundColor: colors.yellow
  },
  listContainer: {
    flex: 1,
    marginTop: 30,
  },
  notExist: {
    alignSelf: 'center',
    marginTop: '30%'
  },
  finishButton: {
    backgroundColor: colors.lightGreen,
    width: '90%',
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 40
  },
  headerContainer: {
    position: 'relative',
    flexDirection: 'row',
    width: '100%',
    height: hp(2.2),
  },
  headerFeedNavContainer: {
    position: 'absolute',
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: 'center',
    width: '100%',
    height: '100%',
    zIndex: 10,
    marginTop: isIphoneX() ? -30 : 0,
  },
  headerFeedNavBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    marginLeft: wp(2.64),
    marginTop: -hp(0.44),
  },
  headerFeedNavBtnTitle: {
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: wp(0.48),
  },
  headerFeedNavBtnArrow: {
    width: 8,
    height: 8,
  },
});