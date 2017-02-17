import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chartify from '../../../chartify.min';
import './chart.css';

class Chart extends Component {

	constructor() {
		super();
	}

	componentWillMount() {
		this.setState({
			config: this.getInitConfig()
		});
	}

	render() {
		return (
			<div className="container">
				<Chartify items={this.props.items} config={config} />
				<Controls {..this.props} />
			</div>
		);
	}

}

export default Chart;