import {REQUEST} from './actions';

/* App Actions */
export const AppRequest = (payload, callback) => ({
  type: REQUEST,
  payload,
  onComplete: callback,
});
