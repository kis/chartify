import React, { PureComponent, Fragment } from 'react';
// import Chartify from 'chartify';
import Chartify from '../../../../dist';
import CSSModules from 'react-css-modules';
import Controls from '../Controls/Controls';
import styles from './chart.css';

class Chart extends PureComponent {
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
				bordered: false
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
			<div styleName="chart-block">
				<h2>{metadata.header}</h2>

				{ data.length ? 
					<Chartify 
						data={data} 
						container={metadata.container} 
						config={config} 
					/> :
					<div styleName="loader"></div> }

				<div styleName="total-info">{data.length} {metadata.total}</div>

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

export default CSSModules(Chart, styles, {allowMultiple: true})