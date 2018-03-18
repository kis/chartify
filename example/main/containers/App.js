import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions/chart";
import Chart from "../components/Chart/Chart";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
// import * as api from '../api/api'; 

class App extends Component {
  constructor(props) {
    super();
    let { actions } = props;
    this.state = {
      time_metadata: {
        container: "real-time-container", 
        header: "Real-time chart",
        total: 'items total ( X - mark date, Y - mark )',
        chart: "time",
        getDataset: null//api.connect
      },
      movies_metadata: {
        container: "films-container", 
        header: "Movies dataset",
        total: 'films total ( X - mark date, Y - mark )',
        chart: "films",
        getDataset: actions.getMovies
      },
      albums_metadata: { 
        container: "songs-container", 
        header: "Music albums dataset",
        total: 'music albums total ( X - album release year, Y - times played )',
        chart: "music",
        getDataset: actions.getAlbums
      }
    }
  }

  render() {
    let { time, data, itunes, actions } = this.props;
    let { time_metadata, albums_metadata, movies_metadata } = this.state;

    return (
      <ErrorBoundary>
        <div className="container">
          <Chart 
            data={data} 
            metadata={movies_metadata} 
            actions={actions} 
          />
          <Chart 
            data={itunes} 
            metadata={albums_metadata} 
            actions={actions} 
          />
        </div>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = state => ({
  time: state.time,
  data: state.data,
  itunes: state.itunes
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
