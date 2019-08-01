import React from 'react';
import ChartContainer from './ChartContainer';

import { Provider } from 'react-redux';
import store from '../store/store';

const AppContainer = () => (
  <Provider store={store}>
    <ChartContainer />
  </Provider>
);

export default AppContainer;
