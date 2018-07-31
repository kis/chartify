import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as chartActions from '../actions/chart';
import Chart from '../components/Chart/Chart';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
// import * as api from '../api/api';

class App extends Component {
  constructor(props) {
    super();
    const { actions } = props;

    this.state = {
      // timeMetadata: {
      //   container: 'real-time-container',
      //   header: 'Real-time chart',
      //   total: 'items total ( X - mark date, Y - mark )',
      //   chart: 'time',
      //   getDataset: null, // api.connect
      // },
      moviesMetadata: {
        container: 'films-container',
        header: 'Movies dataset',
        total: 'films total ( X - mark date, Y - mark )',
        chart: 'films',
        getDataset: actions.getMovies,
      },
      albumsMetadata: {
        container: 'songs-container',
        header: 'Music albums dataset',
        total: 'music albums total ( X - album release year, Y - times played )',
        chart: 'music',
        getDataset: actions.getAlbums,
      },
    };
  }

  render() {
    const {
      data, itunes, actions,
    } = this.props;
    const { albumsMetadata, moviesMetadata } = this.state;

    return (
      <ErrorBoundary>
        <div className="container">
          <Chart
            data={data}
            metadata={moviesMetadata}
            actions={actions}
          />
          <Chart
            data={itunes}
            metadata={albumsMetadata}
            actions={actions}
          />
        </div>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = state => ({
  // time: state.time,
  data: state.data,
  itunes: state.itunes,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(chartActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
