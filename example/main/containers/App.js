import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions/chart";
import Chart from "../components/Chart/Chart";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";

class App extends Component {
  constructor(props) {
    super();
    let { data, config, actions, itunes, config_itunes } = props;
    actions.initConfig();
    this.state = {
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
    let { data, config, actions, itunes, config_itunes } = this.props;
    let { albums_metadata, movies_metadata } = this.state;

    return (
      <ErrorBoundary>
        <div className="container">
          <Chart 
            data={data} 
            config={config} 
            metadata={movies_metadata} 
            actions={actions} 
          />
          <Chart 
            data={itunes} 
            config={config_itunes} 
            metadata={albums_metadata} 
            actions={actions} 
          />
        </div>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data,
  config: state.config,
  itunes: state.itunes,
  config_itunes: state.config_itunes
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
