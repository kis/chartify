import React, { PureComponent, Fragment } from 'react';
import Chartify from '../../../../index.js';
import Controls from '../Controls/Controls';
import './chart.css';

export default class Chart extends PureComponent {
	constructor(props) {
		super();
		let { metadata } = props;
		metadata.getDataset();
		this.state = {
			config: {
				theme: metadata.chart === 'films' ? "default" : "blue",
				width: 50,
				height: 10,
				box_radius: metadata.chart === 'films' ? 8 : 0,
				line: false,
				line_only: false,
				bordered: false,
				blink: false
			}
		}
	}

	changeConfig(params) {
		this.setState({config: params});
	}

	render() {
		let { data, metadata, actions } = this.props;
		let { config } = this.state;

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
					onChange={params => this.changeConfig(params)}
				/>
			</div>
		);
	}
}
