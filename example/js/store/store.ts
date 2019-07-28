import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import chartApp from '../reducers/chart';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* eslint-disable no-underscore-dangle */
const store: any = createStore(
  chartApp,
  composeEnhancer(
    applyMiddleware(thunkMiddleware)
  )
);
/* eslint-enable */

export default store;
