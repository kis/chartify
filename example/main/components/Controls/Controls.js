import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as util from '../../util/util';
import './controls.css';

class Controls extends Component {

	constructor() {
		super();
	}

	changeRange = () => {
		let val = document.getElementById("range").value;
		this.props.actions.updateChart(this.props.data, {...this.props.config, box_size: parseInt(val)});
	}

	refreshData = () => {
		const { data:items } = this.props;
		let newItems = items.map(item => {
			item.sortValue = Math.random().toFixed(5);
			return item;
		}).sort((a,b) => a.sortValue > b.sortValue ? 1 : -1);
		this.props.actions.updateChart(newItems, this.props.config);
	}

	changeTheme = () => {
		const themes = {0:'default', 1:'purple', 2:'grey', 3:'white'};
		let curr = 0;

		Object.values(themes).forEach((val, i) => {
			if (this.props.config.theme == val) {
				curr = i;
			}
		});

		let next = curr < Object.keys(themes).length - 1 ? curr + 1 : 0;

		this.props.actions.updateChart(this.props.data, {
			...this.props.config, 
			line_only: false,
			theme: themes[next]
		});
	}

	toggleLine = () => {
		this.props.actions.updateChart(this.props.data, {
			...this.props.config, 
			line_only: false,
			line: !this.props.config.line
		});
	}

	toggleBordered = () => {
		this.props.actions.updateChart(this.props.data, {
			...this.props.config, 
			line_only: false,
			bordered: !this.props.config.bordered
		});
	}

	toggleBoxRadius = () => {
		let radiuses = [0, 5, 8, 10];
		let num = radiuses.indexOf(this.props.config.box_radius);
		num = num == 3 ? 0 : ++num;

		this.props.actions.updateChart(this.props.data, {
			...this.props.config, 
			line_only: false,
			box_radius: radiuses[num]
		});
	}

	toggleBlink = () => {
		this.props.actions.updateChart(this.props.data, {
			...this.props.config, 
			line_only: false,
			blink: !this.props.config.blink
		});
	}

	toggleLineOnly = () => {
		this.props.actions.updateChart(this.props.data, {
			...this.props.config, 
			line_only: !this.props.config.line_only
		});
	}

	render() {
		return (
			<div className="control-block">
				<button 
					type="button" 
					className="button"
					style={util.getRandomColor()}
					onClick={this.toggleLine}>
					Toggle line
				</button>

				<button 
					type="button" 
					className="button"
					style={util.getRandomColor()}
					onClick={this.toggleBordered}>
					Toggle borders
				</button>

				<button 
					type="button" 
					className="button"
					style={util.getRandomColor()}
					onClick={this.toggleBoxRadius}>
					Toggle box radius
				</button>

				<button 
					type="button" 
					className="button"
					style={util.getRandomColor()}
					onClick={this.refreshData}>
					Refresh data
				</button>

				<button 
					type="button" 
					className="button"
					style={util.getRandomColor()}
					onClick={this.changeTheme}>
					Change theme
				</button> 

				<button 
					type="button" 
					className="button"
					style={util.getRandomColor()}
					onClick={this.toggleBlink}>
					Toggle blink
				</button>

				<button
					type="button" 
					className="button"
					style={util.getRandomColor()}
					onClick={this.toggleLineOnly}>
					Toggle line-only
				</button>
			</div>
		);
	}
}

export default Controls;