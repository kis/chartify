import React, { Component } from 'react';
import Chartify from '../../../chartify.min';
import './chart.css';

export default class Chart extends Component {

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
