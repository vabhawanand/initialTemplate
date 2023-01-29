import {call, put, putResolve, takeLatest} from 'redux-saga/effects';
import HTTP from '../../service/httpService';
import Routes from '../../constants/url_routes';
import {
  CHANGE_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST,
  LOGIN_REQUEST,
  LOGIN_REQUEST_OFFLINE,
  PROFILE_IMAGE_UPLOAD_REQUEST,
  PROFILE_UPDATE_REQUEST,
  REGISTER_REQUEST,
  SOCIAL_LOGIN_REQUEST,
  SOCIAL_REGISTER_REQUEST,
} from '../actions/actions';

function* loginUser({payload, onComplete}) {
  // console.log(JSON.stringify(payload));
  try {
    const res = yield call(HTTP.PostData, Routes.Login_Url, payload);
    console.log(JSON.stringify(res));

    // return onComplete({status: 'failed', message: 'api calling error'});
    // console.log(JSON.stringify(data));
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
function* registerUser({payload, onComplete}) {
  try {
    const res = yield call(PostApi, payload);
    if (res.status == 'success') {
      yield put({type: 'LOGIN', payload: res.userData});
      return onComplete({
        status: res.status,
        message: res.message,
        userData: res.userData,
      });
    } else {
      return onComplete({status: res.status, message: res.message});
    }
  } catch (error) {
    console.log('@Error occured', JSON.stringify(error));
  }
}
function* socialLoginUser({payload, onComplete}) {
  try {
    const res = yield call(PostRawJsonApi, payload);
    const {status, message, userData} = res;
    if (status == 'success') {
      if (Object.keys(userData).length > 0) {
        yield put({type: 'LOGIN', payload: userData});
      }
      return onComplete({status, message, userData});
    } else {
      return onComplete({status: res.status, message: res.message});
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
}
function* socialRegisterUser({payload, onComplete}) {
  try {
    const res = yield call(PostRawJsonApi, payload);
    const {status, message} = res;
    if (status == 'success') {
      yield put({type: 'LOGIN', payload: res.userData});
      return onComplete({
        status: res.status,
        message: res.message,
        userData: res.userData,
      });
    } else {
      return onComplete({status: res.status, message: res.message});
    }
  } catch (error) {
    return onComplete({status: 'failed', message: 'something went wrong'});
  }
}
function* uploadProfileImage({payload, onComplete}) {
  try {
    console.log(JSON.stringify(payload));
    const res = yield call(PostApi, payload);
    console.log('AuthSaga: ', JSON.stringify(res));
    const {status, response} = res;
    if (status == 'success') {
      yield put({type: 'LOGIN', payload: response});
      return onComplete({
        status,
        message: 'Updated Sccessfully',
        userData: response,
      });
    } else {
      return onComplete({status: res.status, message: res.message});
    }
  } catch (error) {
    console.log('@Error occured', JSON.stringify(error));
  }
}
function* updateProfile({payload, onComplete}) {
  try {
    // console.log(JSON.stringify(payload));
    const res = yield call(PostApi, payload);
    // console.log('AuthSaga: ', JSON.stringify(res));
    // const { status, message } = res;
    if (res.status == 'success') {
      yield put({type: 'LOGIN', payload: res.userData});
      return onComplete({
        status: res.status,
        message: res.message,
        userData: res.userData,
      });
    } else {
      return onComplete({status: res.status, message: res.message});
    }
  } catch (error) {
    console.log('@Error occured', JSON.stringify(error));
  }
}
function* changePassword({payload, onComplete}) {
  try {
    // console.log(JSON.stringify(payload));
    const res = yield call(PostApi, payload);
    const {status, message} = res;
    // yield put({ type: 'LOGIN', payload: res.userData });
    return onComplete({
      status,
      message,
    });
  } catch (error) {
    console.log('@Error occured', JSON.stringify(error));
  }
}
function* forgotPassword({payload, onComplete}) {
  try {
    // console.log(JSON.stringify(payload));
    const res = yield call(PostApi, payload);
    // console.log('AuthSaga: ', JSON.stringify(res));
    // const { status, message } = res;
    if (res.status == 'success') {
      yield put({type: 'LOGIN', payload: res.userData});
      return onComplete({
        status: res.status,
        message: res.message,
        userData: res.userData,
      });
    } else {
      return onComplete({status: res.status, message: res.message});
    }
  } catch (error) {
    console.log('@Error occured', JSON.stringify(error));
  }
}

export default function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginUser);
  yield takeLatest(REGISTER_REQUEST, registerUser);
  yield takeLatest(SOCIAL_REGISTER_REQUEST, socialRegisterUser);
  yield takeLatest(SOCIAL_LOGIN_REQUEST, socialLoginUser);
  yield takeLatest(PROFILE_IMAGE_UPLOAD_REQUEST, uploadProfileImage);
  yield takeLatest(PROFILE_UPDATE_REQUEST, updateProfile);
  yield takeLatest(CHANGE_PASSWORD_REQUEST, changePassword);
  yield takeLatest(FORGOT_PASSWORD_REQUEST, forgotPassword);
}
