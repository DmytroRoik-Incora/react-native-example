import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import * as ActionTypes from '../../store/actions';

import BottomSheet from 'reanimated-bottom-sheet';

import {
  Button,
  DivideLine,
  CategoryWithList,
  BubbleBackground,
  CancelButton,
  SelectFromListPopup,
  AddNewGoalPopup,
} from '../../components';

import { I18nLocalize } from "./../../i18n";

import styles from './styles';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { arrowLeftWhite } from '../../assets/icons';

export const AddGoals = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const language = useSelector(state => state.profile.language);
  const createdGoals = useSelector(state => state.goals.createdGoals);

  const bsRef = useRef(null);
  const headerRef = useRef(headerRef);

  const [bsOpened, setBsOpen] = useState(true);
  const [isFromList, setIsFromList] = useState(false);


  const i18n = new I18nLocalize();
  i18n.locale = language;

  useEffect(() => {
    dispatch(ActionTypes.getPredefinedGoals.request());
    dispatch(ActionTypes.getCategories.request());
    dispatch(ActionTypes.getStravaTypes.request());
    dispatch(ActionTypes.getGoodreadsTypes.request());
  }, []);

  const openPopup = (flag) => {
    setIsFromList(flag);
    bsRef.current.snapTo(0);
  }

  const renderHeader = () => (
    bsOpened ? <CancelButton onPress={() => bsRef.current.snapTo(1)} /> : null
  )

  const renderSelectFromListContent = () => (
    bsOpened ? <SelectFromListPopup closePopup={() => bsRef.current.snapTo(1)} /> : null
  )

  const renderAddNewContent = () => (
    bsOpened ? <AddNewGoalPopup closePopup={() => bsRef.current.snapTo(1)} /> : null
  )

  const navigateToGoals = () => {
    dispatch({ type: ActionTypes.RESET_CREATED_GOALS });
    navigation.navigate('Main');
  }

  const popupHeightSnap =
    isIphoneX()
      ? Dimensions.get('window').height * 0.92
      : Dimensions.get('window').height * 0.92 + 50;

  return (
    <View style={styles.container}>
      <View style={styles.setupWrapper}>
        <View style={styles.setupContainer}>
          <AddGoalsNavigationHeader />

          <Text style={styles.title} ref={headerRef}>
            {i18n.t('addGoals.setUpGoals')}
          </Text>

          <Button
            title={i18n.t('addGoals.selectFromList')}
            style={styles.selectButton}
            onPress={() => openPopup(true)}
          />
          <DivideLine
            lineText={i18n.t('addGoals.or')}
            lineStyle={styles.lineStyle}
            lineStyleText={styles.lineStyleText}
          />
          <Button
            title={i18n.t('addGoals.addNew')}
            style={styles.addButton}
            textStyle={styles.addButtonText}
            onPress={() => openPopup(false)}
          />
        </View>
      </View>
      <BubbleBackground />
      <View style={styles.listContainer}>
        {createdGoals.length === 0 && <Text style={styles.notExist}>
          {i18n.t('addGoals.goalsNotExist')}
        </Text>}
        <FlatList
          data={createdGoals}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <CategoryWithList list={item} />}
        />
        <Button
          title={i18n.t('addGoals.finish')}
          style={styles.finishButton}
          disabled={createdGoals.length === 0}
          onPress={navigateToGoals}
        />
      </View>
      <BottomSheet
        snapPoints={[popupHeightSnap, '0']}
        renderHeader={renderHeader}
        renderContent={isFromList ? renderSelectFromListContent : renderAddNewContent}
        ref={bsRef}
        initialSnap={1}
        onOpenStart={() => setBsOpen(true)}
        onCloseEnd={() => setBsOpen(false)}
        enabledContentGestureInteraction={!bsOpened}
        enabledHeaderGestureInteraction
        enabledBottomClamp
      />
    </View>
  );
};

export const AddGoalsNavigationHeader = () => {
  const navigation = useNavigation();

  const language = useSelector(state => state.profile.language);

  const dispatch = useDispatch();
  const i18n = new I18nLocalize();
  i18n.locale = language;

  const navigateBack = () => {
    dispatch({ type: ActionTypes.RESET_CREATED_GOALS });
    navigation.goBack();
  }

  return (
    <View style={styles.headerContainer}>

      <View style={styles.headerFeedNavContainer}>

        <TouchableOpacity
          style={styles.headerFeedNavBtn}
          onPress={navigateBack} >

          <Image
            source={arrowLeftWhite}
            style={styles.headerFeedNavBtnArrow} />

          <Text style={styles.headerFeedNavBtnTitle}>
            {i18n.t('addGoals.goals')}
          </Text>

        </TouchableOpacity>
      </View>
    </View>
  );
}