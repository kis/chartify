import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/chart';
import Chart from '../components/Chart/Chart';
import Controls from '../components/Controls/Controls';

class AppContainer extends Component {

	constructor(props) {
		super();
		props.actions.initConfig();
	}

	render() {
		return (
			<div>
				<Chart {...this.props} />
				<Controls {...this.props} />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	data: state.data,
	config: state.config
});

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(actions, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);