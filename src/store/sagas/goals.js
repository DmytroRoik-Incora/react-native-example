import {
  all,
  fork,
  call,
  takeLatest,
  put,
  select
} from 'redux-saga/effects';

import * as ActionTypes from '../actions';

import * as Api from "../../services/goals";

import * as ProfileApi from '../../services/profile';

function* getPredefinedGoals(action) {
  const { response, error } = yield call(Api.getPredefinedGoals, action.payload);

  if (response) {
    yield put(ActionTypes.getPredefinedGoals.success(response));
  } else {
    yield put(ActionTypes.getPredefinedGoals.failure(error));
  }
};

function* watchGetPredefinedGoals() {
  yield takeLatest(ActionTypes.GET_PREDEFINED_GOALS_REQUEST, getPredefinedGoals);
};

function* getActiveGoals() {
  const { response, error } = yield call(Api.getActiveGoals);

  if (response) {
    const categoriesOffsets = {};
    response.data.forEach(category => categoriesOffsets[category.name] = { offset: 1, leftAmount: category.leftAmount });
    yield put(ActionTypes.getActiveGoals.success({ categoriesOffsets, data: response.data }));
  } else {
    yield put(ActionTypes.getActiveGoals.failure(error));
  }
};

function* watchGetGoalsSuccess() {
  yield takeLatest(ActionTypes.GET_ACTIVE_GOALS_SUCCESS, workerGetProfile);
}

function* workerGetProfile() {
  const firstName = yield select(state => state.profile.firstName);

  if (firstName) { return; }

  const { response, error } = yield call(ProfileApi.getProfile);

  if (response) {
    yield put(ActionTypes.getProfile.success(response.data));
  } else {
    console.log('error', error);
    yield put(ActionTypes.getProfile.failure(error));
  }
}

function* watchGetActiveGoals() {
  yield takeLatest(ActionTypes.GET_ACTIVE_GOALS_REQUEST, getActiveGoals);
};

function* watchGetMoreActiveGoals() {
  yield takeLatest(ActionTypes.GET_MORE_ACTIVE_GOALS_REQUEST, workerGetMoreActiveGoals);
}

function* workerGetMoreActiveGoals({ payload }) {
  const { response, error } = yield call(Api.getMoreActiveGoals, payload);

  const activeGoals = yield select(state => state.goals.activeGoals.goals);
  const categories = yield select(state => state.goals.categories);
  const categoriesOffsets = yield select(state => state.goals.activeGoals.categoriesOffsets);

  const selectedCategory = categories.find(category => category.id === payload.categoryId);

  if (response) {
    const { leftAmount, goals } = response.data;

    const updatedActiveGoals = [...activeGoals];
    updatedActiveGoals.forEach(category => {
      if (category.id === payload.categoryId) {
        !!payload.params.fetchAllTillOffset
          ? category.items = goals
          : category.items.push(...goals);
      }
    });

    const updatedCategoriesOffsets = { ...categoriesOffsets };
    updatedCategoriesOffsets[selectedCategory.name] = {
      leftAmount,
      offset: updatedCategoriesOffsets[selectedCategory.name].offset + 1,
    }

    yield put(ActionTypes.getMoreActiveGoals.success({ updatedActiveGoals, updatedCategoriesOffsets }));

    if (payload.archiveGoalId) {
      yield put(ActionTypes.archiveGoal.request(payload.archiveGoalId));
    }
  } else {
    yield put(ActionTypes.getMoreActiveGoals.failure(error));
  }
}

function* watchGetArchivedGoalsYears() {
  yield takeLatest(ActionTypes.GET_ARCHIVED_GOALS_YEARS_REQUEST, workerGetArchivedGoalsYears);
}

function* workerGetArchivedGoalsYears() {
  const { response, error } = yield call(Api.getArchivedGoalsYears);

  if (response) {
    const oldArchivedGoalsYears = yield select(state => state.goals.archivedGoals.years);
    const isMoreYearsAvailable = !!response.data.length;

    yield put(ActionTypes.getArchivedGoals.successYears({ years: response.data, isMoreYearsAvailable }));

    if (!oldArchivedGoalsYears.length && !!response.data.length) {
      yield put(ActionTypes.getArchivedGoals.request({ year: response.data[0] }));
    }
  } else {
    yield put(ActionTypes.getArchivedGoals.failureYears(error));
  }
}

function* getArchivedGoals({ payload }) {
  const { response, error } = yield call(Api.getArchivedGoals, payload);

  if (response) {
    const goals = yield select(state => state.goals.archivedGoals.goals);
    const years = yield select(state => state.goals.archivedGoals.years);
    let oldOffset = yield select(state => state.goals.archivedGoals.offset);

    const yearItemIdx = goals.findIndex(item => item.year === payload.year.toString());
    const updatedGoals = [...goals];

    const archivedGoals =
      (yearItemIdx !== -1 && goals[yearItemIdx])
        ? [...goals[yearItemIdx], ...response.data]
        : { year: payload.year.toString(), categories: response.data };
    const offset = years.length !== oldOffset ? oldOffset + 1 : oldOffset;
    const isMoreYearsAvailable = years.length !== offset;

    if (yearItemIdx !== -1) {
      updatedGoals[yearItemIdx].goals = archivedGoals;
    } else {
      updatedGoals.push(archivedGoals);
    }

    yield put(ActionTypes.getArchivedGoals.success({ updatedGoals, offset, isMoreYearsAvailable }));
  } else {
    yield put(ActionTypes.getArchivedGoals.failure(error));
  }
};

function* watchGetArchivedGoals() {
  yield takeLatest(ActionTypes.GET_ARCHIVED_GOALS_REQUEST, getArchivedGoals);
};

function* watchGetMoreArchivedGoalsByCategory() {
  yield takeLatest(ActionTypes.GET_MORE_ARCHIVED_GOALS_CATEGORY_REQUEST, workerGetMoreArchivedGoalsByCategory);
}

function* workerGetMoreArchivedGoalsByCategory({ payload }) {
  const { response, error } = yield call(Api.getMoreArchivedGoalsByCategory, payload);

  const goals = yield select(state => state.goals.archivedGoals.goals);
  const categoriesList = yield select(state => state.goals.categories);
  const categoriesOffsets = yield select(state => state.goals.archivedGoals.categoriesOffsets);

  if (response) {
    const leftAmount = response.data.leftAmount;
    const currentCategory = categoriesList.find(category => category.id === payload.categoryId);
    const yearItemIdx = goals.findIndex(item => item.year === payload.year.toString());
    const categories = goals[yearItemIdx].categories;
    const categoryIdx = categories.findIndex(item => item.id === payload.categoryId);

    const updatedCategoryGoals = [...categories];

    const archivedGoals =
      (categoryIdx !== -1 && categories[categoryIdx])
        ? !!payload.params.fetchAllTillOffset
          ? [...response.data.goals]
          : [...categories[categoryIdx].items, ...response.data.goals]
        : [];
    const offset =
      categoriesOffsets[payload.year] && categoriesOffsets[payload.year][currentCategory.name]
        ? categoriesOffsets[payload.year][currentCategory.name].offset + 1
        : 2;

    if (categoryIdx !== -1) {
      updatedCategoryGoals[categoryIdx].items = archivedGoals;
    } else {
      updatedCategoryGoals.push(archivedGoals);
    }

    const updatedGoals = [...goals];
    updatedGoals[yearItemIdx].categories[categoryIdx] = updatedCategoryGoals[categoryIdx];

    const updatedCategoryOffsets = { ...categoriesOffsets };
    updatedCategoryOffsets[payload.year] = updatedCategoryOffsets[payload.year] ? { ...updatedCategoryOffsets[payload.year] } : {};
    updatedCategoryOffsets[payload.year][currentCategory.name] = { offset, leftAmount };

    yield put(ActionTypes.getMoreArchivedGoalsCategory.success({ updatedGoals, updatedCategoryOffsets }));

    if (payload.activeGoalId) {
      yield put(ActionTypes.unarchiveGoal.request(payload.activeGoalId));
    }
  } else {
    yield put(ActionTypes.getMoreArchivedGoalsCategory.failure(error));
  }
}

function* createGoals(action) {
  const { response, error } = yield call(Api.createGoals, action.payload);

  const createdGoals = yield select(state => state.goals.createdGoals);
  const activeGoals = yield select(state => state.goals.activeGoals.goals);

  if (response) {
    const newCreatedGoals = [...createdGoals];
    const newActiveGoals = [...activeGoals];

    response.data.forEach((cat) => {
      const createdCategoryIdx = createdGoals.findIndex((existCat) => existCat.id === cat.id);
      const activeCategoryIdx = activeGoals.findIndex((existCat) => existCat.id === cat.id);

      createdCategoryIdx !== -1
        ? newCreatedGoals[createdCategoryIdx].items = [...newCreatedGoals[createdCategoryIdx].items, ...cat.items]
        : newCreatedGoals.push(cat);

      activeCategoryIdx !== -1
        ? newActiveGoals[activeCategoryIdx].items = [...newActiveGoals[activeCategoryIdx].items, ...cat.items]
        : newActiveGoals.push(cat);
    });

    yield put(ActionTypes.createGoals.success({ newCreatedGoals, newActiveGoals }));
  } else {
    yield put(ActionTypes.createGoals.failure(error));
  }
};

function* watchCreateGoals() {
  yield takeLatest(ActionTypes.CREATE_GOALS_REQUEST, createGoals);
};

function* deleteGoal(action) {
  const { response, error } = yield call(Api.deleteGoal, action.payload);

  const createdGoals = yield select(state => state.goals.createdGoals);
  const activeGoals = yield select(state => state.goals.activeGoals.goals);

  if (response) {
    const newCreatedGoals = createdGoals
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((goal) => goal.id !== action.payload)
      }))
      .filter((e) => e.items.length > 0);

    const newActiveGoals = activeGoals
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((goal) => goal.id !== action.payload)
      }))
      .filter((e) => e.items.length > 0);

    yield put(ActionTypes.deleteGoal.success({ newCreatedGoals, newActiveGoals }));
  } else {
    yield put(ActionTypes.deleteGoal.failure(error));
  }
};

function* watchDeleteGoal() {
  yield takeLatest(ActionTypes.DELETE_GOAL_REQUEST, deleteGoal);
};

function* archiveGoal(action) {
  const { response, error } = yield call(Api.archiveGoal, action.payload);

  const activeGoals = yield select(state => state.goals.activeGoals.goals);
  const archivedGoals = yield select(state => state.goals.archivedGoals);
  const categories = yield select(state => state.goals.categories);

  if (response) {
    const newActiveGoals = activeGoals
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((goal) => goal.id !== action.payload)
      }))
      .filter((e) => e.items.length > 0);

    const allActiveGoals = [];
    activeGoals.forEach((cat) => allActiveGoals.push(...cat.items));

    const newArchivedGoals = [...archivedGoals.goals];
    const currentGoal = allActiveGoals.find((goal) => goal.id === action.payload);
    const currentCategory = categories.find((cat) => cat.id === currentGoal.categoryId);
    const yearIdx = newArchivedGoals.findIndex((yearCat) => yearCat.year === new Date().getFullYear().toString());

    if (yearIdx !== -1) {
      const idx = newArchivedGoals[yearIdx].categories.findIndex((cat) => cat.id === currentGoal.categoryId);
      if (idx !== -1) {
        newArchivedGoals[yearIdx].categories[idx].items.push(currentGoal);
      } else {
        const newCategory = {
          ...currentCategory,
          items: [currentGoal]
        };
        newArchivedGoals[yearIdx].categories.push(newCategory);
      }
    } else {
      const newCategory = {
        ...currentCategory,
        items: [currentGoal]
      };
      const newYearCategory = {
        year: new Date().getFullYear(),
        categories: [newCategory]
      };
      newArchivedGoals.push(newYearCategory);
    }

    yield put(ActionTypes.archiveGoal.success({ newActiveGoals, newArchivedGoals }));
  } else {
    yield put(ActionTypes.archiveGoal.failure(error));
  }
};

function* watchArchiveGoal() {
  yield takeLatest(ActionTypes.ARCHIVE_GOAL_REQUEST, archiveGoal);
};

function* unarchiveGoal(action) {
  const { response, error } = yield call(Api.archiveGoal, action.payload);

  if (response) {
    const activeGoals = yield select(state => state.goals.activeGoals.goals);
    const archivedGoals = yield select(state => state.goals.archivedGoals.goals);
    const categories = yield select(state => state.goals.categories);

    const newArchivedGoals = archivedGoals
      .map((year) => ({
        ...year,
        categories: year.categories
          .map((cat) => ({
            ...cat,
            items: cat.items.filter((goal) => goal.id !== action.payload)
          }))
          .filter((e) => e.items && e.items.length > 0)
      }))
      .filter((year) => year.categories.length > 0);

    const allArchivedGoals = [];
    archivedGoals.forEach((year) => year.categories.forEach((cat) => allArchivedGoals.push(...cat.items)));

    const newActiveGoals = [...activeGoals];
    const currentGoal = allArchivedGoals.find((goal) => goal.id === action.payload);
    const currentCategory = categories.find((cat) => cat.id === currentGoal.categoryId);
    const idx = newActiveGoals.findIndex((cat) => cat.id === currentGoal.categoryId);

    if (idx !== -1) {
      newActiveGoals[idx].items.push(currentGoal);
    } else {
      const newCategory = {
        ...currentCategory,
        items: [currentGoal]
      };
      newActiveGoals.push(newCategory);
    }

    yield put(ActionTypes.unarchiveGoal.success({ newActiveGoals, newArchivedGoals }));
  } else {
    yield put(ActionTypes.unarchiveGoal.failure(error));
  }
};

function* watchUnarchiveGoal() {
  yield takeLatest(ActionTypes.UNARCHIVE_GOAL_REQUEST, unarchiveGoal);
};

function* copyGoal(action) {
  const { response, error } = yield call(Api.createGoals, action.payload);

  const activeGoals = yield select(state => state.goals.activeGoals.goals);

  if (response) {
    const newActiveGoals = [...activeGoals];

    const copiedCategory = response.data[0];
    const activeCategoryIdx = activeGoals.findIndex((existCat) => existCat.id === copiedCategory.id);

    activeCategoryIdx !== -1
      ? newActiveGoals[activeCategoryIdx].items = [...newActiveGoals[activeCategoryIdx].items, ...copiedCategory.items]
      : newActiveGoals.push(copiedCategory);

    yield put(ActionTypes.copyGoal.success(newActiveGoals));
  } else {
    yield put(ActionTypes.copyGoal.failure(error));
  }
};

function* watchCopyGoal() {
  yield takeLatest(ActionTypes.COPY_GOAL_REQUEST, copyGoal);
};

function* changePrivate(action) {
  const { response, error } = yield call(Api.changePrivate, action.payload);

  const activeGoals = yield select(state => state.goals.activeGoals.goals);

  if (response) {
    const newActiveGoals = activeGoals.map((cat) => {
      action.payload.list.forEach((id) => {
        const idx = cat.items.findIndex((item) => item.id === id);
        if (idx !== -1) {
          const isPrivate = cat.items[idx].isPrivate
          cat.items[idx].isPrivate = !isPrivate;
        }
      });
      return cat;
    });

    yield put(ActionTypes.changePrivate.success(newActiveGoals));
  } else {
    yield put(ActionTypes.changePrivate.failure(error));
  }
};

function* watchChangePrivate() {
  yield takeLatest(ActionTypes.CHANGE_PRIVATE_REQUEST, changePrivate);
};

function* getCategories() {
  const { response, error } = yield call(Api.getCategories);

  if (response) {
    const searchCategories = [{ label: 'All', value: null }];
    const formattedCategories = [];
    const categories = response.data;
    categories.forEach((cat) => {
      searchCategories.push({ label: cat.name, value: cat.id });
      formattedCategories.push({ label: cat.name, value: cat.id });
    });

    yield put(ActionTypes.getCategories.success({ categories, searchCategories, formattedCategories }));
  } else {
    yield put(ActionTypes.getCategories.failure(error));
  }
};

function* watchGetCategories() {
  yield takeLatest(ActionTypes.GET_CATEGORIES_REQUEST, getCategories);
};

function* getContinuedGoal(action) {
  const { response, error } = yield call(Api.getContinuedGoal, action.payload);

  if (response) {
    yield put(ActionTypes.getContinuedGoal.success(response));
  } else {
    yield put(ActionTypes.getContinuedGoal.failure(error));
  }
};

function* watchGetContinuedGoal() {
  yield takeLatest(ActionTypes.GET_CONTINUED_GOAL_REQUEST, getContinuedGoal);
};

function* getQuantitativeGoal(action) {
  const { response, error } = yield call(Api.getQuantitativeGoal, action.payload);

  if (response) {
    yield put(ActionTypes.getQuantitativeGoal.success(response));
  } else {
    yield put(ActionTypes.getQuantitativeGoal.failure(error));
  }
};

function* watchGetQuantitativeGoal() {
  yield takeLatest(ActionTypes.GET_QUANTITATIVE_GOAL_REQUEST, getQuantitativeGoal);
};

function* addContinuedRecord(action) {
  const { response, error } = yield call(Api.addContinuedRecord, action.payload);

  if (response) {
    yield put(ActionTypes.addContinuedRecord.success(response));
    yield put(ActionTypes.getActiveGoals.request());
  } else {
    yield put(ActionTypes.addContinuedRecord.failure(error));
  }
};

function* watchAddContinuedRecord() {
  yield takeLatest(ActionTypes.ADD_CONTINUED_RECORD_REQUEST, addContinuedRecord);
};

function* addQuantitativeRecord(action) {
  const { response, error } = yield call(Api.addQuantitativeRecord, action.payload);

  if (response) {
    yield put(ActionTypes.addQuantitativeRecord.success(response));
    yield put(ActionTypes.getActiveGoals.request());
  } else {
    yield put(ActionTypes.addQuantitativeRecord.failure(error));
  }
};

function* watchAddQuantitativeRecord() {
  yield takeLatest(ActionTypes.ADD_QUANTITATIVE_RECORD_REQUEST, addQuantitativeRecord);
};

function* editContinuedRecord(action) {
  const { response, error } = yield call(Api.editContinuedRecord, action.payload);

  if (response) {
    yield put(ActionTypes.editContinuedRecord.success(response));
  } else {
    yield put(ActionTypes.editContinuedRecord.failure(error));
  }
};

function* watchEditContinuedRecord() {
  yield takeLatest(ActionTypes.EDIT_CONTINUED_RECORD_REQUEST, editContinuedRecord);
};

function* editQuantitativeRecord(action) {
  const { response, error } = yield call(Api.editQuantitativeRecord, action.payload);

  if (response) {
    yield put(ActionTypes.editQuantitativeRecord.success(response));
  } else {
    yield put(ActionTypes.editQuantitativeRecord.failure(error));
  }
};

function* watchEditQuantitativeRecord() {
  yield takeLatest(ActionTypes.EDIT_QUANTITATIVE_RECORD_REQUEST, editQuantitativeRecord);
};

function* deleteQuantitativeRecord(action) {
  const { response, error } = yield call(Api.deleteQuantitativeRecord, action.payload);

  if (response) {
    yield put(ActionTypes.deleteQuantitativeRecord.success(action.payload.recordId));
    yield put(ActionTypes.getActiveGoals.request());
  } else {
    yield put(ActionTypes.deleteQuantitativeRecord.failure(error));
  }
};

function* watchDeleteQuantitativeRecord() {
  yield takeLatest(ActionTypes.DELETE_QUANTITATIVE_RECORD_REQUEST, deleteQuantitativeRecord);
};

function* watchGetStravaTypes() {
  yield takeLatest(ActionTypes.STRAVA_TYPES_REQUEST, workerGetStravaTypes);
};

function* workerGetStravaTypes() {
  const { response, error } = yield call(Api.getStravaTypes);

  if (response) {
    yield put(ActionTypes.getStravaTypes.success(response.data));
  } else {
    yield put(ActionTypes.getStravaTypes.failure(error));
  }
};

function* watchGetGoodreadsTypes() {
  yield takeLatest(ActionTypes.GOODREADS_TYPES_REQUEST, workerGetGoodreadsTypes);
};

function* workerGetGoodreadsTypes() {
  const { response, error } = yield call(Api.getGoodreadsTypes);

  if (response) {
    yield put(ActionTypes.getGoodreadsTypes.success(response.data));
  } else {
    yield put(ActionTypes.getGoodreadsTypes.failure(error));
  }
};

function* watchGetFriendGoals() {
  yield takeLatest(ActionTypes.FRIEND_GOALS_REQUEST, workerGetFriendGoals);
}

function* workerGetFriendGoals({ payload }) {
  const { response, error } = yield call(Api.getFriendGoals, payload);
  if (response) {
    const friendsGoals = yield select(state => state.goals.friendsGoals);

    const categoriesOffsets = {};
    response.data.forEach(category => categoriesOffsets[category.name] = { offset: 1, leftAmount: category.leftAmount });

    const updatedFriendsGoals = { ...friendsGoals };
    updatedFriendsGoals[payload.toString()] = {
      goals: response.data,
      categoriesOffsets,
    };

    yield put(ActionTypes.getFriendGoals.success(updatedFriendsGoals));
  } else {
    console.log('error', error);
    yield put(ActionTypes.getFriendGoals.failure(error));
  }
}

function* watchGetMoreFriendGoals() {
  yield takeLatest(ActionTypes.GET_MORE_FRIEND_GOALS_REQUEST, workerGetMoreFriendGoals);
};

function* workerGetMoreFriendGoals({ payload }) {
  const { response, error } = yield call(Api.getMoreFriendGoals, payload);

  const friendsGoalsList = yield select(state => state.goals.friendsGoals);
  const friendGoals = yield select(state => state.goals.friendsGoals[payload.userId.toString()]?.goals);
  const categories = yield select(state => state.goals.categories);
  const categoriesOffsets = yield select(state => state.goals.friendsGoals[payload.userId.toString()]?.categoriesOffsets);

  const selectedCategory = categories.find(category => category.id === payload.categoryId);

  if (response) {
    const { leftAmount, goals } = response.data;

    const updatedFriendGoals = [...friendGoals];
    updatedFriendGoals.forEach(category => {
      if (category.id === payload.categoryId) {
        category.items.push(...goals);
      }
    });

    const updatedCategoriesOffsets = { ...categoriesOffsets };
    updatedCategoriesOffsets[selectedCategory.name] = {
      leftAmount,
      offset: updatedCategoriesOffsets[selectedCategory.name].offset + 1,
    }

    const updatedFriendsGoalsList = { ...friendsGoalsList };
    updatedFriendsGoalsList[payload.userId.toString()] = {
      categoriesOffsets: updatedCategoriesOffsets,
      goals: updatedFriendGoals,
    }

    yield put(ActionTypes.getMoreFriendGoals.success(updatedFriendsGoalsList));
  } else {
    yield put(ActionTypes.getMoreFriendGoals.failure(error));
  }
};

export default function* goalsSaga() {
  yield all([
    fork(watchGetPredefinedGoals),
    fork(watchGetActiveGoals),
    fork(watchGetArchivedGoals),
    fork(watchCreateGoals),
    fork(watchDeleteGoal),
    fork(watchArchiveGoal),
    fork(watchUnarchiveGoal),
    fork(watchCopyGoal),
    fork(watchChangePrivate),
    fork(watchGetCategories),
    fork(watchGetContinuedGoal),
    fork(watchGetGoalsSuccess),
    fork(watchGetQuantitativeGoal),
    fork(watchAddContinuedRecord),
    fork(watchAddQuantitativeRecord),
    fork(watchEditContinuedRecord),
    fork(watchEditQuantitativeRecord),
    fork(watchDeleteQuantitativeRecord),
    fork(watchGetArchivedGoalsYears),
    fork(watchGetMoreArchivedGoalsByCategory),
    fork(watchGetStravaTypes),
    fork(watchGetGoodreadsTypes),
    fork(watchGetMoreActiveGoals),
    fork(watchGetFriendGoals),
    fork(watchGetMoreFriendGoals),
  ]);
}