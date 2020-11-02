import { StyleSheet } from 'react-native';

import { globalStyles, colors } from '../../constants';

export default StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 30
  },
  withBackground: {
    padding: 30,
    backgroundColor: colors.bgWhite,
    borderRadius: 20,
  },
  itemWithbackground: {
    padding: 30,
    backgroundColor: colors.bgWhiteSemiTransparent,
    borderRadius: 12,
  },
  listTitleWrapper: {
    marginBottom: 15
  },
  listTitleWrapperWithBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.white,
    paddingBottom: 15,
  },
  listTitle: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 16,
  },
  listItem: {
    ...globalStyles.baseFlex,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  itemShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  leftPart: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20
  },
  progress: {
    marginRight: 6
  },
  checkBoxText: {
    marginRight: 0,
  },
  listItemText: {
    fontSize: 10,
    fontWeight: '600',
  },
  iconsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  icon: {
    width: 15,
    height: 15,
    marginHorizontal: 2
  },
  loadMoreArchivedGoalsBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  loadMoreArchivedGoalsBtnTitle: {
    fontWeight: 'bold',
    color: colors.white,
  },
});