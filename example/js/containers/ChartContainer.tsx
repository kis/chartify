import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as chartActions from '../actions/chart';
import Chart from '../components/Chart/Chart';

const ChartContainer = ({ actions, movies }: any) => {
  const [moviesMetadata, setMoviesMetadata] = useState({
    container: 'films-container',
    chart: 'films'
  })

  useEffect(() => {
    actions.getMovies()
  }, [actions])

  return (
    <Chart
      data={movies}
      metadata={moviesMetadata}
    />
  );
}

const mapStateToProps = (state: any) => ({
  movies: state.movies,
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(chartActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartContainer);
