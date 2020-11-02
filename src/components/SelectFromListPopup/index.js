import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import * as ActionTypes from '../../store/actions';
import { Dropdown } from 'react-native-material-dropdown';
import { useDebounce } from '../../helpers';
import {
  Button,
  BubbleBackground,
  NewGoalListElement,
  Input
} from '../../components';
import styles from './styles';
import { I18nLocalize } from "./../../i18n";

export default SelectFromListPopup = ({ closePopup }) => {
  const dispatch = useDispatch();

  const predefinedGoals = useSelector(state => state.goals.predefinedGoals);
  const categories = useSelector(state => state.goals.categories);
  const searchCategories = useSelector(state => state.goals.searchCategories);
  const isLoading = useSelector(state => state.goals.loading);
  const createdGoals = useSelector(state => state.goals.createdGoals);
  const language = useSelector(state => state.profile.language);

  const [isInited, setInit] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategoryId, setSeacrhCategoryId] = useState('');
  const [finishDisabled, setFinishDisabled] = useState(true);
  const [newGoals, setNewGoals] = useState([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 800);

  const i18n = new I18nLocalize();
  i18n.locale = language;

  useEffect(() => {
    if (isInited) {
      closePopup();
    }
  }, [createdGoals]);

  useEffect(() => {
    if (isInited) {
      const params = {
        search: debouncedSearchTerm || '',
        category: searchCategoryId || ''
      };
      dispatch(ActionTypes.getPredefinedGoals.request(params));
    }
    setInit(true);
  }, [debouncedSearchTerm, searchCategoryId]);

  onItemChange = ({ newGoal, isChecked }) => {
    if (isChecked) {
      const newGoalsIds = [];
      newGoals.forEach((goal) => newGoalsIds.push(goal.id));
      if (newGoalsIds.includes(newGoal.id)) {
        const idx = newGoals.findIndex((goal) => goal.id === newGoal.id);
        if (idx !== -1) {
          newGoals.splice(idx, 1, newGoal);
          setNewGoals(newGoals);
        }
      } else {
        newGoals.push(newGoal);
        setNewGoals(newGoals);
      }
    } else {
      const idx = newGoals.findIndex((goal) => goal.id === newGoal.id);
      if (idx !== -1) {
        newGoals.splice(idx, 1);
        setNewGoals(newGoals);
      }
    }
    setFinishDisabled(newGoals.length === 0 || newGoals.findIndex((goal) => goal.amount === 'XX') !== -1);
  }
  finishHandler = () => {
    const newGoalsCopy = newGoals;
    newGoalsCopy.forEach((goal) => delete goal.id);
    dispatch(ActionTypes.createGoals.request({ list: newGoalsCopy }));
  }

  return (
    <View style={styles.container}>
      <BubbleBackground />
      <View style={styles.inputsWrapper}>
        <Input
          style={styles.input}
          placeholder={i18n.t('addGoals.search')}
          onFocus={() => console.log('focus')}
          onBlur={() => console.log('active')}
          onChangeText={setSearchTerm}
        />
        <Dropdown
          data={searchCategories}
          value={i18n.t('addGoals.selectCategory')}
          dropdownOffset={{ top: 0, left: 15 }}
          containerStyle={styles.dropdownContainer}
          inputContainerStyle={styles.dropdownInputContainer}
          style={styles.dropdownInput}
          onChangeText={setSeacrhCategoryId}
        />
      </View>
      <FlatList
        style={styles.flatListContainer}
        data={predefinedGoals}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <NewGoalListElement
          item={item}
          itemCategory={categories.find((cat) => cat.id === item.categoryId)}
          onItemChange={(e) => onItemChange(e)}
          showCheckbox
        />
        }
      />
      <Button
        title={i18n.t('addGoals.finish')}
        style={styles.finishButton}
        disabled={finishDisabled}
        isLoading={isLoading}
        onPress={() => finishHandler()}
      />
    </View>
  )
}