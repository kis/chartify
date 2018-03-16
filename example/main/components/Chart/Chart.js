import React, { Component } from 'react';
import Chartify from '../../../../chartify.min.js';
import Controls from '../Controls/Controls';
import './chart.css';

export default class Chart extends Component {
	render() {
		let { data, config, actions, itunes, config_itunes } = this.props;

		return (
			<div className="container">
				<h2>Movies dataset</h2>

				<Chartify data={data} container="films-container" config={config} />
				<div className="total-info">{data.length} films total ( X - mark date, Y - mark )</div>
				<Controls data={data} chart="films" config={config} actions={actions} />

				<br/><br/>

				<h2>Music albums dataset</h2>

				<Chartify data={itunes} container="songs-container" config={config_itunes} />
				<div className="total-info">{itunes.length} music albums total ( X - album release year, Y - times played )</div>
				<Controls data={itunes} chart="music" config={config_itunes} actions={actions} />
			</div>
		);
	}
}
