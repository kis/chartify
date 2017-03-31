import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/chart';
import Chart from '../components/Chart/Chart';
import MapSearchPanel from '../components/MapSearchPanel/MapSearchPanel';
import Map from '../components/Map/Map';

class App extends Component {

	constructor(props) {
		super();
		props.actions.initConfig();
	}

	render() {
		return (
			<div>
				<Chart {...this.props} />

				<MapSearchPanel {...this.props} />
				<Map {...this.props} />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	data: state.data,
	config: state.config,
	itunes: state.itunes,
	config_itunes: state.config_itunes
});

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(actions, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(App);