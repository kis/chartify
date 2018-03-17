import React, { PureComponent, Fragment } from 'react';
import Chartify from '../../../../chartify.min.js';
import Controls from '../Controls/Controls';
import './chart.css';

export default class Chart extends PureComponent {
	constructor(props) {
		super();
		props.metadata.getDataset();
	}

	render() {
		let { data, config, metadata, actions } = this.props;

		return (
			<div className="chart-block">
				<h2>{metadata.header}</h2>

				{ data.length ? 
					<Chartify 
						data={data} 
						container={metadata.container} 
						config={config} 
					/> :
					<div className="loader"></div> }

				<div className="total-info">{data.length} {metadata.total}</div>

				<Controls 
					data={data} 
					chart={metadata.chart} 
					config={config} 
					actions={actions} 
				/>
			</div>
		);
	}
}
