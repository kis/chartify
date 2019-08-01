import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as chartActions from '../actions/chart';
import Chart from '../components/Chart/Chart';

class ChartContainer extends Component<any, any> {
  state = {
    moviesMetadata: {
      container: 'films-container',
      chart: 'films'
    }
  }

  componentWillMount() {
    const { actions } = this.props;
    actions.getMovies();
  }

  render() {
    const { movies } = this.props;
    const { moviesMetadata } = this.state;

    return (
      <Chart
        data={movies}
        metadata={moviesMetadata}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  movies: state.movies,
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(chartActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartContainer);
