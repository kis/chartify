import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './controls.css';

const controls = [{
	name: 'Toggle line',
	func: 'changeTheme'
}, {
	name: 'Toggle borders',
	func: 'toggleBordered'
}, {
	name: 'Toggle box radius',
	func: 'toggleBoxRadius'
}, {
	name: 'Change theme',
	func: 'changeTheme'
}, {
	name: 'Toggle line-only',
	func: 'toggleLineOnly'
}];

class Controls extends Component<any, any> {
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
			line_only: false,
			theme: themes[next]
		});
	}

	toggleLine = () => {
		this.props.onChange({
			...this.props.config,
			line_only: false,
			line: !this.props.config.line
		});
	}

	toggleBordered = () => {
		this.props.onChange({
			...this.props.config,
			line_only: false,
			bordered: !this.props.config.bordered
		});
	}

	toggleBoxRadius = () => {
		let radiuses = [0, 5, 8, 10];
		let num = radiuses.indexOf(this.props.config.box_radius);
		num = num == 3 ? 0 : ++num;

		this.props.onChange({
			...this.props.config,
			line_only: false,
			box_radius: radiuses[num]
		});
	}

	toggleLineOnly = () => {
		this.props.onChange({
			...this.props.config,
			line_only: !this.props.config.line_only
		});
	}

	render() {
		return (
			<div styleName="control-block">
				{controls.map((control: any, i: number) => {
					return <button 
						type="button" 
						onClick={this[control.func]} 
						styleName="control" 
						key={i}>
							{control.name} 
						</button>
				})}
			</div>
		);
	}
}

export default CSSModules(Controls, styles, {allowMultiple: true})