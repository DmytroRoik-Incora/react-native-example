import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as ActionTypes from '../../store/actions';
import { CheckBox } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { goodreadsIcon } from '../../assets/icons';
import {
  Button,
  BubbleBackground,
  NewGoalListElement,
  Input
} from '../../components';
import {
  colors,
  GoalDuration,
  GoalPeriodicity,
  GoalUnitName,
} from '../../constants';
import styles from './styles';
import { I18nLocalize } from "./../../i18n";

export default AddNewGoalPopup = ({ closePopup }) => {
  const dispatch = useDispatch();

  const language = useSelector(state => state.profile.language);
  const [stravaTypes, goodreadsTypes] =
    useSelector(state => [state.goals.goalTypes.strava, state.goals.goalTypes.goodreads]);

  const i18n = new I18nLocalize();
  i18n.locale = language;

  const categories = useSelector(state => state.goals.categories);
  const formattedCategories = useSelector(state => state.goals.formattedCategories);
  const createdGoals = useSelector(state => state.goals.createdGoals);

  const defaultCategory = {
    color: '',
    id: null,
    integration: [],
    name: ''
  };

  const [isInited, setInit] = useState(false);
  const [showTextField, setShowTextField] = useState(false);

  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalCategory, setNewGoalCategory] = useState(defaultCategory);
  const [isPrivate, setPrivate] = useState(false);
  const [number, setNumber] = useState('');
  const [unitName, setUnitName] = useState('');
  const [customUnitName, setCustomUnitName] = useState('');
  const [selectedIntegrationType, setSelectedIntegrationType] = useState(null);

  const [goalPeriodicity, setGoalPeriodicity] = useState(GoalPeriodicity);

  const defaultPeriodicity = { label: '', value: i18n.t('addGoals.selectPeriodicity') }
  const [periodicity, setPeriodicity] = useState(defaultPeriodicity);

  const defaultDuration = { label: '', value: i18n.t('addGoals.selectDuration') }
  const [duration, setDuration] = useState(defaultDuration);

  const remapIntegrationNames = (integrationNames) => {
    return integrationNames.map(integrationName => ({ label: integrationName, value: integrationName }));
  }

  const stravaRemapedTypes = remapIntegrationNames(stravaTypes);

  const displayItem = {
    title: newGoalTitle,
    categoryId: newGoalCategory && newGoalCategory.id,
    isPrivate,
    amount: number,
    unitName: unitName || customUnitName,
    duration: duration && duration.label && i18n.t(`durations.${duration.label}`),
    periodicity: periodicity && periodicity.label ? i18n.t(`periodicities.${periodicity.label}`) : null,
    type: periodicity && periodicity.label ? 'continued' : 'quantitative',
  };

  const item = {
    title: newGoalTitle,
    categoryId: newGoalCategory && newGoalCategory.id,
    isPrivate,
    amount: Number(number),
    unitName: unitName || customUnitName,
    duration: duration && duration.label ? duration.value : null,
    periodicity: periodicity && periodicity.label ? periodicity.value : null,
    type: periodicity && periodicity.label ? 'continued' : 'quantitative',
    unit: showTextField ? 'amount' : 'time'
  };

  let isFinishButtonDisabled;
  isFinishButtonDisabled = !newGoalTitle.length
    || !newGoalCategory
    || (newGoalCategory && !newGoalCategory.id)
    || !number
    || (!showTextField && !Boolean(unitName))
    || (showTextField && !Boolean(customUnitName))
    || !duration
    || (duration && !duration.label);

  useEffect(() => {
    if (isInited) {
      closePopup();
    }
    setInit(true);
  }, [createdGoals]);

  const onChangeCategoryHandler = (id) => {
    const currentCategory = categories.find((cat) => cat.id === id);
    setNewGoalCategory(currentCategory);
  }

  const onChangeUnitNameTypeHandler = (value) => {
    setShowTextField(Boolean(!value));
    setUnitName(value);

    if (Boolean(!value)) {
      setCustomUnitName('');
    }
  }

  const onChangePeriodicityHandler = (periodicity) => {
    const currentPeriodicity = GoalPeriodicity.find((per) => per.value === periodicity);
    setPeriodicity(currentPeriodicity);
  }

  const onChangeDurationHandler = (duration) => {
    const currentDuration = GoalDuration.find((dur) => dur.value === duration);
    setDuration(currentDuration);

    const goalPeriodicity = GoalPeriodicity.filter((e) => e.value < currentDuration.value);
    setGoalPeriodicity(goalPeriodicity);

    const goalPeriodicityLabels = [];
    goalPeriodicity.forEach((e) => goalPeriodicityLabels.push(e.label));
    if (periodicity && periodicity.label && !goalPeriodicityLabels.includes(periodicity.label)) {
      const goalPeriodicityLength = goalPeriodicity.length - 1;
      setPeriodicity(goalPeriodicity[goalPeriodicityLength] || defaultPeriodicity);
    }
  }

  return (
    <View style={styles.container}>
      <BubbleBackground />
      <View style={styles.inputsWrapper}>
        <Input
          style={styles.input}
          placeholder={i18n.t('addGoals.goal')}
          onChangeText={setNewGoalTitle}
        />
        <Dropdown
          data={formattedCategories}
          value={i18n.t('addGoals.selectCategory')}
          dropdownOffset={{ top: 0, left: 15 }}
          containerStyle={styles.dropdownContainer}
          inputContainerStyle={styles.dropdownInputContainer}
          style={styles.dropdownInput}
          onChangeText={(e) => onChangeCategoryHandler(e)}
        />
      </View>
      <View style={styles.checkBoxesContainer}>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            onPress={() => setPrivate(!isPrivate)}
            title={i18n.t('addGoals.makePrivate')}
            Component={TouchableWithoutFeedback}
            size={26}
            checkedIcon='check-circle'
            uncheckedIcon='circle-o'
            checked={isPrivate}
            checkedColor={colors.lightGreen}
            textStyle={styles.checkBoxText}
          />
        </View>
      </View>
      <View style={styles.settings}>
        <View style={styles.settingsLine}>
          <Input
            style={styles.settingsNumberInput}
            placeholder={'#'}
            onChangeText={setNumber}
          />
          <Dropdown
            data={GoalUnitName}
            value={i18n.t('addGoals.selectType')}
            dropdownOffset={{ top: 0, left: 15 }}
            containerStyle={[
              styles.dropdownContainer,
              { width: showTextField ? '35%' : '75%' }]
            }
            inputContainerStyle={styles.dropdownInputContainer}
            style={styles.dropdownInput}
            onChangeText={(value) => onChangeUnitNameTypeHandler(value)}
          />
          {showTextField && <Input
            style={styles.settingsTextField}
            placeholder={i18n.t('addGoals.items')}
            onChangeText={setCustomUnitName}
          />}
        </View>
        <View style={styles.settingsLine}>
          <Dropdown
            data={goalPeriodicity}
            labelExtractor={({ label }) => i18n.t(`periodicities.${label}`)}
            value={periodicity && periodicity.value}
            dropdownOffset={{ top: 0, left: 15 }}
            containerStyle={[styles.dropdownContainer, { width: '48%' }]}
            inputContainerStyle={styles.dropdownInputContainer}
            style={styles.dropdownInput}
            onChangeText={(e) => onChangePeriodicityHandler(e)}
          />
          <Dropdown
            data={GoalDuration}
            labelExtractor={({ label }) => i18n.t(`durations.${label}`)}
            value={duration && duration.value}
            dropdownOffset={{ top: 0, left: 15 }}
            containerStyle={[styles.dropdownContainer, { width: '48%' }]}
            inputContainerStyle={styles.dropdownInputContainer}
            style={styles.dropdownInput}
            onChangeText={(e) => onChangeDurationHandler(e)}
          />
        </View>
      </View>
      <Text style={styles.titles}>{i18n.t('addGoals.connectApps')}</Text>
      <Button
        icon={goodreadsIcon}
        title={'Connect goodreads'}
        style={styles.connectButton}
        onPress={() => console.log('connect pressed')}
      />
      <Dropdown
        data={stravaRemapedTypes}
        value={selectedIntegrationType ? selectedIntegrationType : i18n.t('addGoals.selectType')}
        dropdownOffset={{ top: 0, left: 15 }}
        containerStyle={[styles.dropdownContainer, { width: '48%' }]}
        inputContainerStyle={styles.dropdownInputContainer}
        style={styles.dropdownInput}
        onChangeText={setSelectedIntegrationType}
      />
      <Text style={styles.titles}>
        {i18n.t('addGoals.createdGoal')}
      </Text>
      <NewGoalListElement
        item={displayItem}
        itemCategory={newGoalCategory}
      />
      <Button
        title={i18n.t('addGoals.finish')}
        style={[styles.finishButton, styles.addNewFinishButton]}
        disabled={isFinishButtonDisabled}
        onPress={() => dispatch(ActionTypes.createGoals.request({ list: [item] }))}
      />
    </View>
  )
}
