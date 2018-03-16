import React, { Component } from 'react';
import Chartify from '../../../../chartify.min.js';
import Controls from '../Controls/Controls';
import './chart.css';

export default class Chart extends Component {
	render() {
		let { data, config, actions, itunes, config_itunes } = this.props;

		return (
			<div className="container">

				<div className="chart-block">
					<h2>Movies dataset</h2>

					{ data.length ? 
						<Chartify data={data} container="films-container" config={config} /> :
						<div className="loader"></div> }

					<div className="total-info">{data.length} films total ( X - mark date, Y - mark )</div>
					<Controls data={data} chart="films" config={config} actions={actions} />
				</div>

				<div className="chart-block">
					<h2>Music albums dataset</h2>

					{ itunes.length ? 
						<Chartify data={itunes} container="songs-container" config={config_itunes} /> :
						<div className="loader"></div> }

					<div className="total-info">{itunes.length} music albums total ( X - album release year, Y - times played )</div>
					<Controls data={itunes} chart="music" config={config_itunes} actions={actions} />
				</div>
					
			</div>
		);
	}
}
