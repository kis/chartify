import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as chartActions from '../actions/chart';
import AlbumsContainer from './AlbumsContainer';
import MoviesContainer from './MoviesContainer';
import Chart from '../components/Chart/Chart';
import Header from '../components/Header/Header';
// import * as api from '../api/api';

import createHistory from 'history/createBrowserHistory';
import { Router, Switch, Route, Link } from 'react-router-dom';

const history = createHistory({
  basename: '/chartify/example/',
  // forceRefresh: false, 
});

interface Props {
	actions: any;
}

class AppContainer extends Component<Props, any> {
  constructor(props: Props) {
    super(props);
    const { actions } = props;
  }

  render() {
    const {
      actions,
    } = this.props;

    return (
      <Router history={history}>
        <Fragment>
          <Header />
          <Switch>
            <Route exact path="/" component={AlbumsContainer} />
            <Route path={"/albums"} component={AlbumsContainer} />
            <Route path={"/movies"} component={MoviesContainer} />
            <Route path={""} component={AlbumsContainer} />
            <Route path={"**"} component={AlbumsContainer} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

const mapStateToProps = (state: any) => ({
  // time: state.time,
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(chartActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
