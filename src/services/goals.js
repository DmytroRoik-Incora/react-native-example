import {
  makeGetRequest,
  makePatchRequest,
  makePostRequest,
  makePutRequest,
  makeDeleteRequest
} from './axios';

const urls = {
  predefinedGoals: '/goals/predefined',
  activeGoals: 'goals/active',
  getMoreActiveGoals: '/goals/active/more/categoryId',
  archivedGoals: 'goals/archived',
  goals: '/goals',
  archive: '/archive',
  private: '/private',
  categories: '/categories',
  continued: '/continued',
  quantitative: '/quantitative',
  getArchivedGoalsYears: '/goals/archived/years',
  getArchivedGoals: '/goals/archived',
  getFriendGoals: '/goals/friend/userId',
  getMoreFriendGoals: '/goals/friend',
  getStravaTypes: '/integrations/strava/types',
  getGoodreadsTypes: '/integrations/goodreads/types',
};

export const getPredefinedGoals = (params) => {
  return makeGetRequest(urls.predefinedGoals, { params });
}

export const getActiveGoals = () => {
  return makeGetRequest(urls.activeGoals);
}

export const getMoreActiveGoals = ({ categoryId, params }) => {
  return makeGetRequest(urls.getMoreActiveGoals.replace('categoryId', categoryId), { params });
}

export const getArchivedGoalsYears = () => {
  return makeGetRequest(urls.getArchivedGoalsYears);
}

export const getArchivedGoals = (params) => {
  return makeGetRequest(urls.getArchivedGoals, { params });
}

export const getMoreArchivedGoalsByCategory = ({ categoryId, year, params }) => {
  return makeGetRequest(`${urls.getArchivedGoals}/${year}/more/${categoryId}`, { params });
}

export const getFriendGoals = (userId) => {
  return makeGetRequest(urls.getFriendGoals.replace('userId', userId));
}

export const getMoreFriendGoals = ({ userId, categoryId, params }) => {
  return makeGetRequest(`${urls.getMoreFriendGoals}/${userId}/more/${categoryId}`, { params });
}

export const createGoals = (params) => {
  return makePostRequest(urls.goals, params);
}

export const deleteGoal = (id) => {
  return makeDeleteRequest(`${urls.goals}/${id}`);
}

export const archiveGoal = (id) => {
  return makePatchRequest(`${urls.goals}/${id}${urls.archive}`);
}

export const changePrivate = (ids) => {
  return makePatchRequest(`${urls.goals}${urls.private}`, ids);
}

export const getCategories = () => {
  return makeGetRequest(urls.categories);
}

export const getContinuedGoal = ({ id, params = {} }) => {
  return makeGetRequest(`${urls.goals}/${id}${urls.continued}`, { params });
}

export const getQuantitativeGoal = (id) => {
  return makeGetRequest(`${urls.goals}/${id}${urls.quantitative}`);
}

export const addContinuedRecord = ({ id, params }) => {
  return makePostRequest(`${urls.goals}/${id}${urls.continued}`, params);
}

export const addQuantitativeRecord = ({ id, params }) => {
  return makePostRequest(`${urls.goals}/${id}${urls.quantitative}`, params);
}

export const editContinuedRecord = ({ id, params }) => {
  return makePatchRequest(`${urls.goals}/${id}${urls.continued}`, params);
}

export const editQuantitativeRecord = ({ id, recordId, params }) => {
  return makePutRequest(`${urls.goals}/${id}${urls.quantitative}/${recordId}`, params);
}

export const deleteQuantitativeRecord = ({ id, recordId }) => {
  return makeDeleteRequest(`${urls.goals}/${id}${urls.quantitative}/${recordId}`);
}

export const getStravaTypes = () => {
  return makeGetRequest(urls.getStravaTypes);
}

export const getGoodreadsTypes = () => {
  return makeGetRequest(urls.getGoodreadsTypes);
}
