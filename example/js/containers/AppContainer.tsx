import React, { Fragment } from 'react';
import AlbumsContainer from './AlbumsContainer';
import MoviesContainer from './MoviesContainer';
import Header from '../components/Header/Header';

import { Router, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../store/store';
import history from '../store/history';

const AppContainer = () => (
  <Provider store={store}>
    <Router history={history}>
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={AlbumsContainer} />
          <Route path="/albums" component={AlbumsContainer} />
          <Route path="/movies" component={MoviesContainer} />
          <Route path="" component={AlbumsContainer} />
          <Route path="**" component={AlbumsContainer} />
        </Switch>
      </Fragment>
    </Router>
  </Provider>
);

export default AppContainer;
