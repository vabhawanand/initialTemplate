import {call, put, putResolve, takeLatest} from 'redux-saga/effects';
import HTTP from '../../service/httpService';
import {REQUEST} from '../actions/actions';

function* request({payload, onComplete}) {
  try {
    const data = yield call(HTTP.Get, payload);
    console.log(JSON.stringify(data));
    const {status, message, response} = data;
    if (status == 'success') {
      yield put({type: 'LOGIN', payload: response});
      return onComplete({status, message, response});
    } else {
      return onComplete({status, message});
    }
  } catch (error) {
    console.log('@Error occured ', JSON.stringify(error));
    // return onError({ status: 'failure', message: 'Error occured at saga catch block' });
  }
}

export default function* appSaga() {
  yield takeLatest(REQUEST, request);
}
