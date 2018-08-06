import React, { Component } from 'react';
import * as util from '../../util/util';
import CSSModules from 'react-css-modules';
import styles from './controls.css';

class Controls extends Component {
	constructor(props) {
		super();
		this.state = {
			controls: [{
				name: 'Toggle line',
				func: this.changeTheme
			}, {
				name: 'Toggle borders',
				func: this.toggleBordered
			}, {
				name: 'Toggle box radius',
				func: this.toggleBoxRadius
			}, {
				name: 'Change theme',
				func: this.changeTheme
			}, {
				name: 'Toggle line-only',
				func: this.toggleLineOnly
			}]
		}
	}

	changeTheme = () => {
		const themes = { 0:'default', 1:'blue', 2:'grey', 3:'white' };
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
		const { controls } = this.state;

		return (
			<div styleName="control-block">
				{controls.map((control, i) => {
					return <button 
						type="button" 
						onClick={control.func} 
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