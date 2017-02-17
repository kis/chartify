import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chartify from '../../../chartify.min';
import './chart.css';

class Chart extends Component {

	constructor(props) {
		super();
	}

	render() {
		return (
			<div className="container">
				<Chartify data={this.props.data} config={this.props.config} />
			</div>
		);
	}

}

export default Chart;