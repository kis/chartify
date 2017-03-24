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
				<h2>Latest movies I watched</h2>

				<Chartify data={this.props.data} container="films-container" config={this.props.config} />
				<Controls data={this.props.data} chart="films" config={this.props.config} actions={this.props.actions} />

				<br/><br/>

				<h2>My iPod Touch music library</h2>

				<Chartify data={this.props.itunes} container="songs-container" config={this.props.config_itunes} />
				<Controls data={this.props.itunes} chart="music" config={this.props.config_itunes} actions={this.props.actions} />
			</div>
		);
	}

}
