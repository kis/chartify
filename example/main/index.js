import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';

import AppContainer from './containers/AppContainer';

ReactDOM.render((
	<Provider store={store}>
		<AppContainer />
	</Provider>
), document.getElementById('app'));
