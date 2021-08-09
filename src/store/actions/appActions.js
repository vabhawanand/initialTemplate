import Routes from '../../constants/url_routes';
import * as Sentry from '@sentry/react-native';
export const appAction = {
  addGroup: data => dispatch => {
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
          const {} = response;
          resolve(response);
        })
        .catch(error => {
          Sentry.captureException({func: 'addGroup', error});
          reject(error);
        });
      // setTimeout(() => resolve(true), 1000);
    });
  },
};
