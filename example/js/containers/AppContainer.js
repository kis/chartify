import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as chartActions from '../actions/chart';
import AlbumsContainer from './AlbumsContainer';
import MoviesContainer from './MoviesContainer';
import Chart from '../components/Chart/Chart';
import Header from '../components/Header/Header';
// import * as api from '../api/api';

import { BrowserRouter, Route, Link } from 'react-router-dom';

class AppContainer extends Component {
  constructor(props) {
    super();
    const { actions } = props;

    // this.state = {
    //   timeMetadata: {
    //     container: 'real-time-container',
    //     header: 'Real-time chart',
    //     total: 'items total ( X - mark date, Y - mark )',
    //     chart: 'time',
    //     getDataset: null, // api.connect
    //   },
    // };
  }

  render() {
    const {
      actions,
    } = this.props;

    return (
      <BrowserRouter>
        <Fragment>
          <Header />
          <Route exact path="/" component={AlbumsContainer} />
          <Route path="/albums" component={AlbumsContainer} />
          <Route path="/movies" component={MoviesContainer} />
        </Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  // time: state.time,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(chartActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
