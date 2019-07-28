import React, { PureComponent } from 'react';
// import Chartify from 'chartify';
import Chartify from '../../../../dist';
import Controls from '../Controls/Controls';
import { Loader, ChartBlock } from './styles';

interface Props {
	data: any;
	metadata: any;
	actions: any;
}

export default class Chart extends PureComponent<Props, any> {
	constructor(props: Props) {
		super(props);
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

	changeConfig(params: any) {
		this.setState({config: params});
	}

	render() {
		let { data, metadata, actions } = this.props;
		let { config } = this.state;

		return (
			<ChartBlock>
				<h2 className="main-header">{metadata.header}</h2>

				{ data.length ? 
					<Chartify 
						data={data} 
						container={metadata.container} 
						config={config} 
					/> :
					<Loader /> }

				<div className="total-info">{data.length} {metadata.total}</div>

				<Controls 
					data={data} 
					chart={metadata.chart} 
					config={config} 
					actions={actions} 
					onChange={(params: any) => this.changeConfig(params)}
				/>
			</ChartBlock>
		);
	}
}