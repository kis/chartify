import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import chartApp from '../reducers/chart';

const loggerMiddleware = createLogger();

export default createStore(
  chartApp,
  applyMiddleware(thunkMiddleware, loggerMiddleware),
);
