import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store/store';

import { AppContainer } from 'react-hot-loader';
import 'react-hot-loader/patch';

import RootContainer from './containers/RootContainer';

if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React);
}

const render = Component => {
  ReactDOM.render(
    <AppContainer>
    	<Provider store={store}>
      	<Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
}

render(RootContainer);

if (module.hot) {
  module.hot.accept('./containers/RootContainer', () => { render(RootContainer) })
}
