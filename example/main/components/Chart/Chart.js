import React, { Component } from 'react';
import Chartify from '../../../chartify.min';
import Controls from '../Controls/Controls';
import './chart.css';

export default class Chart extends Component {

	constructor(props) {
		super();
	}

	render() {
		return (
			<div className="container">
				<Chartify data={this.props.data} container="films-container" config={this.props.config} />

				<Chartify data={this.props.itunes} container="songs-container" config={this.props.config} />

				<Controls {...this.props} />
			</div>
		);
	}

}
