import Routes from '../../constants/url_routes';
import * as Sentry from '@sentry/react-native';
// Login
export const authAction = {
  doForgot: data => dispatch => {
    return new Promise((resolve, reject) => {
      return fetch(Routes.Forgot_Password_Url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(rawResponse => rawResponse.json())
        .then(response => {
          const {status, message} = response;
          if (status) {
            resolve(message);
          } else {
            reject(message);
          }
        })
        .catch(error => {
          Sentry.captureException({func: 'doForgot', error});
          reject('Failed');
        });
    });
  },
  doValidateEmailHash: data => dispatch => {
    return new Promise((resolve, reject) => {
      return fetch(Routes.Verify_Email_Url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(rawResponse => rawResponse.json())
        .then(response => {
          const {status, message} = response;
          if (status) {
            resolve(message);
          } else {
            reject(message);
          }
        })
        .catch(error => {
          Sentry.captureException({func: 'doValidateEmailHash', error});
          reject('failed');
        });
    });
  },
  doResetPassword: data => dispatch => {
    return new Promise((resolve, reject) => {
      return fetch(Routes.Reset_Password_Url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(rawResponse => rawResponse.json())
        .then(response => {
          const {status, message} = response;
          if (status) {
            resolve(message);
          } else {
            reject(message);
          }
        })
        .catch(error => {
          Sentry.captureException({func: 'doResetPassword', error});
          reject('failed');
        });
    });
  },
  doValidateHash: data => dispatch => {
    return new Promise((resolve, reject) => {
      return fetch(Routes.Validate_FP_Hash_Url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(rawResponse => rawResponse.json())
        .then(response => {
          const {status, message} = response;
          if (status) {
            resolve(status);
          } else {
            reject(message);
          }
        })
        .catch(error => {
          Sentry.captureException({func: 'doValidateHash', error});
          reject('failed');
        });
    });
  },
  doLogin: data => dispatch => {
    return new Promise((resolve, reject) => {
      return fetch(Routes.Login_Url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(rawResponse => rawResponse.json())
        .then(response => {
          const {status, message, token} = response;
          if (status) {
            Sentry.setUser({email: data.email});
            dispatch({
              type: 'LOGIN',
              payload: {token},
              storage: 'local',
            });
            resolve(message);
          } else {
            reject(message);
          }
        })
        .catch(error => {
          Sentry.captureException({func: 'doLogin', error});
          reject('failed');
        });
    });
  },
  doRegister: data => dispatch => {
    return new Promise((resolve, reject) => {
      return fetch(Routes.Register_Url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(rawResponse => rawResponse.json())
        .then(response => {
          const {status, message} = response;
          if (status) {
            resolve(message);
          } else {
            reject(message);
          }
        })
        .catch(error => {
          Sentry.captureException({func: 'doSignUp', error});
          reject(error);
        });
    });
  },
  doLogout: () => dispatch => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Sentry.configureScope(scope => scope.setUser(null));
        dispatch({type: 'LOGOUT'});
        resolve('Success');
      }, 1000);
    });
  },
};
