import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import chartApp from '../reducers/chart';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

/* eslint-disable no-underscore-dangle */
const store: any = createStore(
  chartApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunkMiddleware),
);
/* eslint-enable */

export default store;
