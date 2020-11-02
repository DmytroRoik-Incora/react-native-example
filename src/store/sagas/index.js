import { fork } from 'redux-saga/effects';

import authSaga from './auth';
import goalsSaga from './goals';
import { profileSaga } from './profile';
import { sharingSaga } from './sharing';

export function* rootSaga() {
  yield fork(authSaga)
  yield fork(goalsSaga)
  yield fork(profileSaga)
  yield fork(sharingSaga)
};
