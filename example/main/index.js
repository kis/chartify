import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store/store';

import { AppContainer } from 'react-hot-loader';
import 'react-hot-loader/patch';

import App from './containers/App';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
    	<Provider store={store}>
      	<Component />
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./containers/App', () => { render(App) })
}
