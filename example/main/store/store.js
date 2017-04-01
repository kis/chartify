import chartApp from '../reducers/chart';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();

export default createStore(
  chartApp,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);
