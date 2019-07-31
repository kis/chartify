import React, { Component } from 'react';
import { ControlBlock, Control } from './styles';

export default class Controls extends Component<any, any> {
	changeTheme = () => {
		const themes: any = { 0:'default', 1:'blue', 2:'grey', 3:'white' };
		let curr = 1;

		Object.values(themes).forEach((val, i) => {
			if (this.props.config.theme == val) {
				curr = i;
			}
		});

		let next = curr < Object.keys(themes).length - 1 ? curr + 1 : 0;

		this.props.onChange({
			...this.props.config,
			theme: themes[next]
		});
	}

	toggleBordered = () => {
		this.props.onChange({
			...this.props.config,
			bordered: !this.props.config.bordered
		});
	}

	toggleLineChart = () => {
		this.props.onChange({
			...this.props.config,
			isLineChart: !this.props.config.isLineChart
		});
	}

	render() {
		return (
			<ControlBlock>
				<Control 
					type="button" 
					onClick={this.toggleBordered} 
				>
					Toggle borders
				</Control>
				<Control 
					type="button" 
					onClick={this.changeTheme} 
				>
					Change theme
				</Control>
				<Control 
					type="button" 
					onClick={this.toggleLineChart} 
				>
					Toggle line-chart
				</Control>
			</ControlBlock>
		);
	}
}