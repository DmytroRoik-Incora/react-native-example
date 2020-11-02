import { combineReducers } from 'redux';

import auth from './auth';
import goals from './goals';
import { profileReducer } from './profile';
import { sharingReducer } from './sharing';

export default combineReducers({
  auth,
  goals,
  profile: profileReducer,
  friends: sharingReducer,
});