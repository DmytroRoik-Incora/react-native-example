export const GET_PREDEFINED_GOALS_REQUEST = 'GET_PREDEFINED_GOALS_REQUEST';
export const GET_PREDEFINED_GOALS_SUCCESS = 'GET_PREDEFINED_GOALS_SUCCESS';
export const GET_PREDEFINED_GOALS_FAILURE = 'GET_PREDEFINED_GOALS_FAILURE';

export const getPredefinedGoals = {
  request: (params) => ({ type: GET_PREDEFINED_GOALS_REQUEST, payload: params }),
  success: (goals) => ({ type: GET_PREDEFINED_GOALS_SUCCESS, payload: goals }),
  failure: (error) => ({ type: GET_PREDEFINED_GOALS_FAILURE, payload: error })
}

export const GET_ACTIVE_GOALS_REQUEST = 'GET_ACTIVE_GOALS_REQUEST';
export const GET_ACTIVE_GOALS_SUCCESS = 'GET_ACTIVE_GOALS_SUCCESS';
export const GET_ACTIVE_GOALS_FAILURE = 'GET_ACTIVE_GOALS_FAILURE';

export const getActiveGoals = {
  request: () => ({ type: GET_ACTIVE_GOALS_REQUEST }),
  success: (goals) => ({ type: GET_ACTIVE_GOALS_SUCCESS, payload: goals }),
  failure: (error) => ({ type: GET_ACTIVE_GOALS_FAILURE, payload: error })
}

export const GET_MORE_ACTIVE_GOALS_REQUEST = 'GET_MORE_ACTIVE_GOALS_REQUEST';
export const GET_MORE_ACTIVE_GOALS_SUCCESS = 'GET_MORE_ACTIVE_GOALS_SUCCESS';
export const GET_MORE_ACTIVE_GOALS_FAILURE = 'GET_MORE_ACTIVE_GOALS_FAILURE';

export const getMoreActiveGoals = {
  request: (params) => ({ type: GET_MORE_ACTIVE_GOALS_REQUEST, payload: params }),
  success: (goals) => ({ type: GET_MORE_ACTIVE_GOALS_SUCCESS, payload: goals }),
  failure: (error) => ({ type: GET_MORE_ACTIVE_GOALS_FAILURE, payload: error })
}

export const GET_ARCHIVED_GOALS_YEARS_REQUEST = 'GET_ARCHIVED_GOALS_YEARS_REQUEST';
export const GET_ARCHIVED_GOALS_YEARS_REQUEST_SUCCESS = 'GET_ARCHIVED_GOALS_YEARS_REQUEST_SUCCESS';
export const GET_ARCHIVED_GOALS_YEARS_REQUEST_FAILURE = 'GET_ARCHIVED_GOALS_YEARS_REQUEST_FAILURE';

export const GET_ARCHIVED_GOALS_REQUEST = 'GET_ARCHIVED_GOALS_REQUEST';
export const GET_ARCHIVED_GOALS_SUCCESS = 'GET_ARCHIVED_GOALS_SUCCESS';
export const GET_ARCHIVED_GOALS_FAILURE = 'GET_ARCHIVED_GOALS_FAILURE';

export const getArchivedGoals = {
  requestYears: () => ({ type: GET_ARCHIVED_GOALS_YEARS_REQUEST }),
  successYears: (years) => ({ type: GET_ARCHIVED_GOALS_YEARS_REQUEST_SUCCESS, payload: years }),
  failureYears: (error) => ({ type: GET_ARCHIVED_GOALS_YEARS_REQUEST_FAILURE, payload: error }),
  request: (params) => ({ type: GET_ARCHIVED_GOALS_REQUEST, payload: params }),
  success: (goals) => ({ type: GET_ARCHIVED_GOALS_SUCCESS, payload: goals }),
  failure: (error) => ({ type: GET_ARCHIVED_GOALS_FAILURE, payload: error }),
}

export const GET_MORE_ARCHIVED_GOALS_CATEGORY_REQUEST = 'GET_MORE_ARCHIVED_GOALS_CATEGORY_REQUEST';
export const GET_MORE_ARCHIVED_GOALS_CATEGORY_REQUEST_SUCCESS = 'GET_MORE_ARCHIVED_GOALS_CATEGORY_REQUEST_SUCCESS';
export const GET_MORE_ARCHIVED_GOALS_CATEGORY_REQUEST_FAILURE = 'GET_MORE_ARCHIVED_GOALS_CATEGORY_REQUEST_FAILURE';

export const getMoreArchivedGoalsCategory = {
  request: (query) => ({ type: GET_MORE_ARCHIVED_GOALS_CATEGORY_REQUEST, payload: query }),
  success: (goals) => ({ type: GET_MORE_ARCHIVED_GOALS_CATEGORY_REQUEST_SUCCESS, payload: goals }),
  failure: (error) => ({ type: GET_MORE_ARCHIVED_GOALS_CATEGORY_REQUEST_FAILURE, payload: error }),
}

export const CREATE_GOALS_REQUEST = 'CREATE_GOALS_REQUEST';
export const CREATE_GOALS_SUCCESS = 'CREATE_GOALS_SUCCESS';
export const CREATE_GOALS_FAILURE = 'CREATE_GOALS_FAILURE';

export const createGoals = {
  request: (params) => ({ type: CREATE_GOALS_REQUEST, payload: params }),
  success: (goals) => ({ type: CREATE_GOALS_SUCCESS, payload: goals }),
  failure: (error) => ({ type: CREATE_GOALS_FAILURE, payload: error })
}

export const DELETE_GOAL_REQUEST = 'DELETE_GOAL_REQUEST';
export const DELETE_GOAL_SUCCESS = 'DELETE_GOAL_SUCCESS';
export const DELETE_GOAL_FAILURE = 'DELETE_GOAL_FAILURE';

export const deleteGoal = {
  request: (id) => ({ type: DELETE_GOAL_REQUEST, payload: id }),
  success: (id) => ({ type: DELETE_GOAL_SUCCESS, payload: id }),
  failure: (error) => ({ type: DELETE_GOAL_FAILURE, payload: error })
}

export const RESET_CREATED_GOALS = 'RESET_CREATED_GOALS';

export const ARCHIVE_GOAL_REQUEST = 'ARCHIVE_GOAL_REQUEST';
export const ARCHIVE_GOAL_SUCCESS = 'ARCHIVE_GOAL_SUCCESS';
export const ARCHIVE_GOAL_FAILURE = 'ARCHIVE_GOAL_FAILURE';

export const archiveGoal = {
  request: (id) => ({ type: ARCHIVE_GOAL_REQUEST, payload: id }),
  success: (id) => ({ type: ARCHIVE_GOAL_SUCCESS, payload: id }),
  failure: (error) => ({ type: ARCHIVE_GOAL_FAILURE, payload: error })
}

export const UNARCHIVE_GOAL_REQUEST = 'UNARCHIVE_GOAL_REQUEST';
export const UNARCHIVE_GOAL_SUCCESS = 'UNARCHIVE_GOAL_SUCCESS';
export const UNARCHIVE_GOAL_FAILURE = 'UNARCHIVE_GOAL_FAILURE';

export const unarchiveGoal = {
  request: (id) => ({ type: UNARCHIVE_GOAL_REQUEST, payload: id }),
  success: (id) => ({ type: UNARCHIVE_GOAL_SUCCESS, payload: id }),
  failure: (error) => ({ type: UNARCHIVE_GOAL_FAILURE, payload: error })
}

export const COPY_GOAL_REQUEST = 'COPY_GOAL_REQUEST';
export const COPY_GOAL_SUCCESS = 'COPY_GOAL_SUCCESS';
export const COPY_GOAL_FAILURE = 'COPY_GOAL_FAILURE';

export const copyGoal = {
  request: (params) => ({ type: COPY_GOAL_REQUEST, payload: params }),
  success: (goals) => ({ type: COPY_GOAL_SUCCESS, payload: goals }),
  failure: (error) => ({ type: COPY_GOAL_FAILURE, payload: error })
}

export const CHANGE_PRIVATE_REQUEST = 'CHANGE_PRIVATE_REQUEST';
export const CHANGE_PRIVATE_SUCCESS = 'CHANGE_PRIVATE_SUCCESS';
export const CHANGE_PRIVATE_FAILURE = 'CHANGE_PRIVATE_FAILURE';

export const changePrivate = {
  request: (ids) => ({ type: CHANGE_PRIVATE_REQUEST, payload: ids }),
  success: (ids) => ({ type: CHANGE_PRIVATE_SUCCESS, payload: ids }),
  failure: (error) => ({ type: CHANGE_PRIVATE_FAILURE, payload: error })
}

export const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE';

export const getCategories = {
  request: () => ({ type: GET_CATEGORIES_REQUEST }),
  success: (categories) => ({ type: GET_CATEGORIES_SUCCESS, payload: categories }),
  failure: (error) => ({ type: GET_CATEGORIES_FAILURE, payload: error })
}

export const GET_CONTINUED_GOAL_REQUEST = 'GET_CONTINUED_GOAL_REQUEST';
export const GET_CONTINUED_GOAL_SUCCESS = 'GET_CONTINUED_GOAL_SUCCESS';
export const GET_CONTINUED_GOAL_FAILURE = 'GET_CONTINUED_GOAL_FAILURE';

export const getContinuedGoal = {
  request: (params) => ({ type: GET_CONTINUED_GOAL_REQUEST, payload: params }),
  success: (goal) => ({ type: GET_CONTINUED_GOAL_SUCCESS, payload: goal }),
  failure: (error) => ({ type: GET_CONTINUED_GOAL_FAILURE, payload: error })
}

export const GET_QUANTITATIVE_GOAL_REQUEST = 'GET_QUANTITATIVE_GOAL_REQUEST';
export const GET_QUANTITATIVE_GOAL_SUCCESS = 'GET_QUANTITATIVE_GOAL_SUCCESS';
export const GET_QUANTITATIVE_GOAL_FAILURE = 'GET_QUANTITATIVE_GOAL_FAILURE';

export const getQuantitativeGoal = {
  request: (id) => ({ type: GET_QUANTITATIVE_GOAL_REQUEST, payload: id }),
  success: (goal) => ({ type: GET_QUANTITATIVE_GOAL_SUCCESS, payload: goal }),
  failure: (error) => ({ type: GET_QUANTITATIVE_GOAL_FAILURE, payload: error })
}

export const ADD_CONTINUED_RECORD_REQUEST = 'ADD_CONTINUED_RECORD_REQUEST';
export const ADD_CONTINUED_RECORD_SUCCESS = 'ADD_CONTINUED_RECORD_SUCCESS';
export const ADD_CONTINUED_RECORD_FAILURE = 'ADD_CONTINUED_RECORD_FAILURE';

export const addContinuedRecord = {
  request: (params) => ({ type: ADD_CONTINUED_RECORD_REQUEST, payload: params }),
  success: (record) => ({ type: ADD_CONTINUED_RECORD_SUCCESS, payload: record }),
  failure: (error) => ({ type: ADD_CONTINUED_RECORD_FAILURE, payload: error })
}

export const ADD_QUANTITATIVE_RECORD_REQUEST = 'ADD_QUANTITATIVE_RECORD_REQUEST';
export const ADD_QUANTITATIVE_RECORD_SUCCESS = 'ADD_QUANTITATIVE_RECORD_SUCCESS';
export const ADD_QUANTITATIVE_RECORD_FAILURE = 'ADD_QUANTITATIVE_RECORD_FAILURE';

export const addQuantitativeRecord = {
  request: (params) => ({ type: ADD_QUANTITATIVE_RECORD_REQUEST, payload: params }),
  success: (record) => ({ type: ADD_QUANTITATIVE_RECORD_SUCCESS, payload: record }),
  failure: (error) => ({ type: ADD_QUANTITATIVE_RECORD_FAILURE, payload: error })
}

export const EDIT_CONTINUED_RECORD_REQUEST = 'EDIT_CONTINUED_RECORD_REQUEST';
export const EDIT_CONTINUED_RECORD_SUCCESS = 'EDIT_CONTINUED_RECORD_SUCCESS';
export const EDIT_CONTINUED_RECORD_FAILURE = 'EDIT_CONTINUED_RECORD_FAILURE';

export const editContinuedRecord = {
  request: (params) => ({ type: EDIT_CONTINUED_RECORD_REQUEST, payload: params }),
  success: (record) => ({ type: EDIT_CONTINUED_RECORD_SUCCESS, payload: record }),
  failure: (error) => ({ type: EDIT_CONTINUED_RECORD_FAILURE, payload: error })
}

export const EDIT_QUANTITATIVE_RECORD_REQUEST = 'EDIT_QUANTITATIVE_RECORD_REQUEST';
export const EDIT_QUANTITATIVE_RECORD_SUCCESS = 'EDIT_QUANTITATIVE_RECORD_SUCCESS';
export const EDIT_QUANTITATIVE_RECORD_FAILURE = 'EDIT_QUANTITATIVE_RECORD_FAILURE';

export const editQuantitativeRecord = {
  request: (params) => ({ type: EDIT_QUANTITATIVE_RECORD_REQUEST, payload: params }),
  success: (record) => ({ type: EDIT_QUANTITATIVE_RECORD_SUCCESS, payload: record }),
  failure: (error) => ({ type: EDIT_QUANTITATIVE_RECORD_FAILURE, payload: error })
}

export const DELETE_QUANTITATIVE_RECORD_REQUEST = 'DELETE_QUANTITATIVE_RECORD_REQUEST';
export const DELETE_QUANTITATIVE_RECORD_SUCCESS = 'DELETE_QUANTITATIVE_RECORD_SUCCESS';
export const DELETE_QUANTITATIVE_RECORD_FAILURE = 'DELETE_QUANTITATIVE_RECORD_FAILURE';

export const deleteQuantitativeRecord = {
  request: (params) => ({ type: DELETE_QUANTITATIVE_RECORD_REQUEST, payload: params }),
  success: (id) => ({ type: DELETE_QUANTITATIVE_RECORD_SUCCESS, payload: id }),
  failure: (error) => ({ type: DELETE_QUANTITATIVE_RECORD_FAILURE, payload: error }),
}

export const RESET_ARCHIVE_GOAL_STATUS = 'RESET_ARCHIVE_GOAL_STATUS';

export const STRAVA_TYPES_REQUEST = 'STRAVA_TYPES_REQUEST';
export const STRAVA_TYPES_REQUEST_SUCCESS = 'STRAVA_TYPES_REQUEST_SUCCESS';
export const STRAVA_TYPES_REQUEST_FAILURE = 'STRAVA_TYPES_REQUEST_FAILURE';

export const getStravaTypes = {
  request: () => ({ type: STRAVA_TYPES_REQUEST }),
  success: (stravaTypes) => ({ type: STRAVA_TYPES_REQUEST_SUCCESS, payload: stravaTypes }),
  failure: (error) => ({ type: STRAVA_TYPES_REQUEST_FAILURE, payload: error }),
}

export const GOODREADS_TYPES_REQUEST = 'GOODREADS_TYPES_REQUEST';
export const GOODREADS_TYPES_REQUEST_SUCCESS = 'GOODREADS_TYPES_REQUEST_SUCCESS';
export const GOODREADS_TYPES_REQUEST_FAILURE = 'GOODREADS_TYPES_REQUEST_FAILURE';

export const getGoodreadsTypes = {
  request: () => ({ type: GOODREADS_TYPES_REQUEST }),
  success: (goodreadsTypes) => ({ type: GOODREADS_TYPES_REQUEST_SUCCESS, payload: goodreadsTypes }),
  failure: (error) => ({ type: GOODREADS_TYPES_REQUEST_FAILURE, payload: error }),
}

export const GET_MORE_FRIEND_GOALS_REQUEST = 'GET_MORE_FRIEND_GOALS_REQUEST';
export const GET_MORE_FRIEND_GOALS_SUCCESS = 'GET_MORE_FRIEND_GOALS_SUCCESS';
export const GET_MORE_FRIEND_GOALS_FAILURE = 'GET_MORE_FRIEND_GOALS_FAILURE';

export const getMoreFriendGoals = {
  request: (params) => ({ type: GET_MORE_FRIEND_GOALS_REQUEST, payload: params }),
  success: (goals) => ({ type: GET_MORE_FRIEND_GOALS_SUCCESS, payload: goals }),
  failure: (error) => ({ type: GET_MORE_FRIEND_GOALS_FAILURE, payload: error })
}
