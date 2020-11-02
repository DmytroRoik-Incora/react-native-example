
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as Progress from 'react-native-progress';
import { CheckBox } from 'react-native-elements';
import * as ActionTypes from '../../store/actions';
import {
  GoalDuration,
  GoalPeriodicity,
  colors,
  GOALS_PAGINATION_OFFSET,
  isAndroid,
} from '../../constants';
import {
  binIconRed,
  lockIconYellow,
  duplicateIcon,
  returnIcon,
  rightArrow
} from '../../assets/icons';
import styles from './styles';
import { I18nLocalize } from '../../i18n';

const Item = ({
  item,
  activeGoals,
  archiveGoals,
  isCurrentYear,
  isEditPrivate,
  onPressCheck,
  isFriendsGoal,
  isLoadMoreNeeded,
  handleGetMoreActiveGoals,
  handleGetMoreArchivedGoals
}) => {
  const navigation = useNavigation()
  const dispatch = useDispatch();

  const language = useSelector(state => state.profile.language);

  const [isChecked, setChecked] = useState(item.isPrivate);

  const i18n = new I18nLocalize();
  i18n.locale = language;

  const isQuantitative = item.type === 'quantitative';

  const duration = GoalDuration.find((e) => e.value === item.duration);
  const periodicity = GoalPeriodicity.find((e) => e.value === item.periodicity);

  const itemTitle = isQuantitative
    ? `${item.title} ${item.amount} ${item.unitName} / ${duration && duration.label && i18n.t(`durations.${duration.label}`)}`
    : `${item.title} ${item.amount} ${item.unitName} ${periodicity && periodicity.label && i18n.t(`periodicities.${periodicity.label}`)} / ${duration && duration.label && i18n.t(`durations.${duration.label}`)}`;

  const onPressBinIconHandler = () => {
    if (activeGoals) {
      if (isLoadMoreNeeded) {
        handleGetMoreActiveGoals(item.id);
      } else {
        dispatch(ActionTypes.archiveGoal.request(item.id));
      }
    } else {
      dispatch(ActionTypes.deleteGoal.request(item.id));
    }
  };

  const onPressReturnCopyHandler = () => {
    if (isCurrentYear && !item.achievedDate) {
      if (isLoadMoreNeeded) {
        handleGetMoreArchivedGoals(item.id);
      } else {
        dispatch(ActionTypes.unarchiveGoal.request(item.id));
      }
    } else {
      const newItem = {
        amount: item.amount,
        categoryId: item.categoryId,
        duration: item.duration,
        isPrivate: item.isPrivate,
        periodicity: item.periodicity,
        title: item.title,
        type: item.type,
        unit: item.unit,
        unitName: item.unitName
      };
      dispatch(ActionTypes.copyGoal.request({ list: [newItem] }));
    }
  }

  const onPressCheckHandler = () => {
    onPressCheck({ id: item.id, state: !isChecked });
    setChecked(!isChecked);
  }

  const itemProgress = item.progress / 100;
  let progressColor = '';
  if (archiveGoals) {
    progressColor = colors.darkGrey;
  } else {
    if (itemProgress <= 0.33) {
      progressColor = colors.orange;
    } else if (itemProgress > 0.33 && itemProgress <= 0.66) {
      progressColor = colors.yellow;
    } else {
      progressColor = colors.lightGreen;
    }
  }

  const MainWrapper = activeGoals || archiveGoals || isFriendsGoal
    ? TouchableOpacity
    : View;

  return (
    <MainWrapper
      style={[
        styles.listItem,
        isFriendsGoal && styles.itemWithbackground,
        !isAndroid && styles.itemShadow,
      ]}
      onPress={() => {
        isFriendsGoal
          ? navigation.navigate('FriendGoalCycling', { item, isFriendsGoal })
          : navigation.navigate('GoalCycling', { item, isFriendsGoal });
      }}>
      <View style={styles.leftPart}>
        {(activeGoals || archiveGoals) && !isEditPrivate && <Progress.Circle
          size={24}
          style={styles.progress}
          thickness={3}
          borderWidth={0}
          strokeCap={'round'}
          progress={itemProgress}
          color={progressColor}
          unfilledColor={isFriendsGoal ? colors.white : colors.bgGrey}
        />}
        {isEditPrivate && <CheckBox
          onPress={onPressCheckHandler}
          Component={TouchableWithoutFeedback}
          size={20}
          checkedIcon='check-circle'
          uncheckedIcon='circle-o'
          checked={isChecked}
          checkedColor={colors.lightGreen}
          textStyle={styles.checkBoxText}
        />}
        <Text style={styles.listItemText}>
          {itemTitle}
        </Text>
      </View>
      <View style={styles.iconsWrapper}>
        {
          item.isPrivate &&
          <Image
            style={styles.icon}
            source={lockIconYellow} />
        }
        {
          archiveGoals && <TouchableOpacity onPress={onPressReturnCopyHandler}>
            <Image
              style={styles.icon}
              source={isCurrentYear && !item.achievedDate ? returnIcon : duplicateIcon}
            />
          </TouchableOpacity>
        }
        {
          !archiveGoals
          && <TouchableOpacity onPress={!isFriendsGoal ? onPressBinIconHandler : null}>
            <Image
              style={styles.icon}
              source={isFriendsGoal ? rightArrow : binIconRed}
            />
          </TouchableOpacity>}
      </View>
    </MainWrapper>)
}

export default CategoryWithList = ({
  list,
  withBackground,
  activeGoals,
  archiveGoals,
  isEditPrivate,
  isWhiteTitle,
  isFriendsGoal,
  year,
  changedItemsStateIds,
  setChangedItemsStateIds,
}) => {

  const dispatch = useDispatch();

  const language = useSelector(state => state.profile.language);
  const categoriesList = useSelector(state => state.goals.categories);
  const goals = useSelector(state => state.goals.archivedGoals.goals);
  const selectedFriend = useSelector(state => state.friends.selectedFriend.userId);
  const activeGoalsCategoryOffset = useSelector(state => state.goals.activeGoals.categoriesOffsets[list.name]);
  const archivedGoalsCategoryOffsets = useSelector(state => state.goals.archivedGoals.categoriesOffsets);
  const friendGoalsCategoryOffsets = useSelector(state => state.goals.friendsGoals[selectedFriend]?.categoriesOffsets);

  const i18n = new I18nLocalize();
  i18n.locale = language;
  const isCurrentYear = new Date().getFullYear().toString() === year;

  const isLoadMoreNeeded = list.items.length === 1 &&  !!activeGoalsCategoryOffset && !!activeGoalsCategoryOffset.leftAmount;

  const currentCategory = categoriesList.find(category => category.id === list.id);
  const categoryOffset =
    archivedGoalsCategoryOffsets[year] && archivedGoalsCategoryOffsets[year][currentCategory.name]
      ? archivedGoalsCategoryOffsets[year][currentCategory.name].offset
      : 1;

  const onPressCheck = ({ id, state }) => {
    const currentItem = list.items.find((item) => item.id === id);
    const isAlreadyInList = changedItemsStateIds.includes(currentItem.id);
    const isItemStateChanged = currentItem.isPrivate !== state;
    if (isItemStateChanged) {
      if (!isAlreadyInList) {
        changedItemsStateIds.push(currentItem.id);
        setChangedItemsStateIds(changedItemsStateIds);
      }
    } else {
      if (isAlreadyInList) {
        const idx = changedItemsStateIds.findIndex((e) => e === currentItem.id);
        changedItemsStateIds.splice(idx, 1);
        setChangedItemsStateIds(changedItemsStateIds);
      }
    }
  }

  useEffect(() => {
    if (!isEditPrivate && changedItemsStateIds && changedItemsStateIds.length > 0) {
      dispatch(ActionTypes.changePrivate.request({ list: changedItemsStateIds }));
      setChangedItemsStateIds([]);
    }
  }, [isEditPrivate]);

  const yearCategory = goals.find(item => item.year === year);
  const itemsAmount =
    yearCategory && !activeGoals
      ? (yearCategory.categories.find(item => item.id === list.id)).leftAmount
      : 0;

  const handleGetMoreActiveGoals = (id) => {
    const fetchAllTillOffset = activeGoals.length !== activeGoalsCategoryOffset.offset * GOALS_PAGINATION_OFFSET;
    dispatch(ActionTypes.getMoreActiveGoals.request({
      archiveGoalId: id,
      categoryId: list.id,
      params: {
        fetchAllTillOffset: !!id || fetchAllTillOffset,
        offset: activeGoalsCategoryOffset.offset
      },
    }));
  }

  const handleGetMoreArchivedGoals = (id) => {
    const fetchAllTillOffset = archiveGoals.length !== categoryOffset * GOALS_PAGINATION_OFFSET;
    dispatch(ActionTypes.getMoreArchivedGoalsCategory.request({
      activeGoalId: id,
      year,
      categoryId: list.id,
      params: {
        fetchAllTillOffset: !!id || fetchAllTillOffset,
        offset: categoryOffset
      },
    }));
  }

  const handleGetMoreFriendGoals = () => {
    dispatch(ActionTypes.getMoreFriendGoals.request({
      userId: selectedFriend,
      categoryId: list.id,
      params: {
        offset: friendGoalsCategoryOffsets[currentCategory.name].offset,
        fetchAllTillOffset: false,
      },
    }));
  }

  return (
    <View style={[styles.container, withBackground && styles.withBackground]}>
      <View style={[styles.listTitleWrapper, isWhiteTitle && styles.listTitleWrapperWithBorder]}>
        <Text style={[styles.listTitle, { color: isWhiteTitle ? colors.white : list.color }]}>
          {i18n.t(`goalsScreen.${list.name}`)}
        </Text>
      </View>

      <FlatList
        data={list.items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Item
          item={item}
          isFriendsGoal={isFriendsGoal}
          activeGoals={activeGoals}
          archiveGoals={archiveGoals}
          isCurrentYear={isCurrentYear}
          isEditPrivate={isEditPrivate}
          onPressCheck={({ id, state }) => onPressCheck({ id, state })}
          isLoadMoreNeeded={isLoadMoreNeeded}
          handleGetMoreActiveGoals={handleGetMoreActiveGoals}
          handleGetMoreArchivedGoals={handleGetMoreArchivedGoals}
        />}
      />

      {
        (isFriendsGoal
          && !!friendGoalsCategoryOffsets[currentCategory.name]
          && !!friendGoalsCategoryOffsets[currentCategory.name].leftAmount)
        && <LoadAnotherMoreGoalsBtn
          handleGetMoreGoals={handleGetMoreFriendGoals} />
      }

      {
        (activeGoals
          && !!activeGoalsCategoryOffset
          && !!activeGoalsCategoryOffset.leftAmount)
        && <LoadAnotherMoreGoalsBtn
          handleGetMoreGoals={handleGetMoreActiveGoals} />
      }

      {
        !activeGoals && !(
          archivedGoalsCategoryOffsets[year]
          && archivedGoalsCategoryOffsets[year][currentCategory.name]
          && !archivedGoalsCategoryOffsets[year][currentCategory.name].leftAmount
        ) && itemsAmount !== 0
        && <LoadAnotherMoreGoalsBtn
          handleGetMoreGoals={handleGetMoreArchivedGoals} />
      }
    </View>
  )
}

const LoadAnotherMoreGoalsBtn = ({ handleGetMoreGoals }) => {
  const language = useSelector(state => state.profile.language);
  const i18n = new I18nLocalize();
  i18n.locale = language;

  return (
    <TouchableOpacity
      onPress={() => handleGetMoreGoals()}
      style={styles.loadMoreArchivedGoalsBtn}
    >
      <Text style={styles.loadMoreArchivedGoalsBtnTitle}>
        {i18n.t('goalsScreen.loadMoreGoals')}
      </Text>
    </TouchableOpacity>
  );
}