import {all} from 'redux-saga/effects';
import authSaga from './authSaga';
import appSaga from './appSaga';

function* saga() {
  yield all([authSaga(), appSaga()]);
}

export default saga;
