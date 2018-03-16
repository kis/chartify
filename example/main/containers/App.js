import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions/chart";
import Chart from "../components/Chart/Chart";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";

class App extends Component {
  constructor(props) {
    super();
    props.actions.initConfig();
    props.actions.getAlbums();
    props.actions.getMovies();
  }

  render() {
    return (
      <ErrorBoundary>
        <Chart {...this.props} />
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
