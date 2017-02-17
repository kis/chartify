import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './controls.css';

class Controls extends Component {

	constructor() {
		super();
	}

	componentWillMount() {
		this.setState({
			config: this.getInitConfig()
		});
	}

	changeRange = () => {
		let val = document.getElementById("range").value;
		this.setState({
			boxSize: parseInt(val)
		});
	}

	refreshData = () => {
		const { items } = this.state;
		let newItems = items.map(item => {
			item.sortValue = Math.random().toFixed(5);
			return item;
		}).sort((a,b) => a.sortValue > b.sortValue ? 1 : -1);
		this.setState({
			items: newItems
		});
	}

	changeRange = () => {
		let val = document.getElementById("range").value;
		this.setState({
			boxSize: parseInt(val)
		});
	}

	changeTheme = () => {
		const themes = {0:'default', 1:'purple', 2:'grey', 3:'white'};
		let curr = 0;

		Object.values(themes).forEach((val, i) => {
			if (this.state.theme == val) {
				curr = i;
			}
		});

		let next = curr < Object.keys(themes).length - 1 ? curr + 1 : 0;

		this.setState({
			lineOnly: false,
			theme: themes[next]
		});
	}

	toggleLine = () => {
		this.setState({
			lineOnly: false,
			hasLine: !this.state.hasLine
		});
	}

	toggleBordered = () => {
		this.setState({
			lineOnly: false,
			bordered: !this.state.bordered
		});
	}

	toggleBoxRadius = () => {
		let radiuses = [0, 5, 8, 10];
		let num = radiuses.indexOf(this.state.boxRadius);
		num = num == 3 ? 0 : ++num;

		this.setState({
			lineOnly: false,
			boxRadius: radiuses[num]
		});
	}

	toggleBlink = () => {
		this.setState({
			lineOnly: false,
			blink: !this.state.blink
		});
	}

	toggleLineOnly = () => {
		this.setState({
			lineOnly: !this.state.lineOnly
		});
	}

	render() {
		return (
			<div className="control-block">
				<button 
					type="button" 
					className="button"
					style={this.getRandomColor()}
					onClick={this.toggleLine}>
					Toggle line
				</button>

				<button 
					type="button" 
					className="button"
					style={this.getRandomColor()}
					onClick={this.toggleBordered}>
					Toggle borders
				</button>

				<button 
					type="button" 
					className="button"
					style={this.getRandomColor()}
					onClick={this.toggleBoxRadius}>
					Toggle box radius
				</button>

				<button 
					type="button" 
					className="button"
					style={this.getRandomColor()}
					onClick={this.refreshData}>
					Refresh data
				</button>

				<button 
					type="button" 
					className="button"
					style={this.getRandomColor()}
					onClick={this.changeTheme}>
					Change theme
				</button> 

				<button 
					type="button" 
					className="button"
					style={this.getRandomColor()}
					onClick={this.toggleBlink}>
					Toggle blink
				</button>

				<button
					type="button" 
					className="button"
					style={this.getRandomColor()}
					onClick={this.toggleLineOnly}>
					Toggle line-only
				</button>
			</div>
		);
	}
}

export default Controls;