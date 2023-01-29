import {
  CHANGE_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST,
  LOGIN_REQUEST,
  PROFILE_IMAGE_UPLOAD_REQUEST,
  PROFILE_UPDATE_REQUEST,
  REGISTER_REQUEST,
  SOCIAL_LOGIN_REQUEST,
  SOCIAL_REGISTER_REQUEST,
} from './actions';

// Login
export const loginRequest = (payload, callback) => ({
  type: LOGIN_REQUEST,
  payload,
  onComplete: callback,
});
export const registerUser = (payload, callback) => ({
  type: REGISTER_REQUEST,
  payload,
  onComplete: callback,
});
export const socialRegisterUser = (payload, callback) => ({
  type: SOCIAL_REGISTER_REQUEST,
  payload,
  onComplete: callback,
});
export const socialLoginUser = (payload, callback) => ({
  type: SOCIAL_LOGIN_REQUEST,
  payload,
  onComplete: callback,
});
export const updateProfileImage = (payload, callback) => ({
  type: PROFILE_IMAGE_UPLOAD_REQUEST,
  payload,
  onComplete: callback,
});
export const updateProfile = (payload, callback) => ({
  type: PROFILE_UPDATE_REQUEST,
  payload,
  onComplete: callback,
});
export const changePassword = (payload, callback) => ({
  type: CHANGE_PASSWORD_REQUEST,
  payload,
  onComplete: callback,
});
export const forgotPassword = (payload, callback) => ({
  type: FORGOT_PASSWORD_REQUEST,
  payload,
  onComplete: callback,
});
