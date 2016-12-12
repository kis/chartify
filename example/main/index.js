import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chartify from '../chartify.min';
import votes from './votes.json';

import './main.css';

class App extends Component {

	constructor() {
		super();
	}

	componentWillMount() {
		let items = votes.map(item => ({
			value: item["моя оценка"],
			titleRus: item["русскоязычное название"],
			title: item["оригинальное название"],
			date: item["дата и время"]
		}));
		items.reverse();

		let dateRegex = /(\d+)[.](\d+)[.](\d+)/;

		for (let i in items) {
			if (items[i].date) {
				let date = dateRegex.exec(items[i].date);
				items[i].date = date && date[0];
			}
		}

		this.setState({
			items: items,
			boxSize: 20,
			boxRadius: 10,
			theme: 'grey',
			hasLine: false,
			bordered: false,
			blink: false
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
		const themes = {0:'default', 1:'purple', 2:'grey'};
		let curr = 0;

		Object.values(themes).forEach((val, i) => {
			if (this.state.theme == val) {
				curr = i;
			}
		});

		let next = curr < Object.keys(themes).length - 1 ? curr + 1 : 0;

		this.setState({
			theme: themes[next]
		});
	}

	toggleLine = () => {
		this.setState({
			hasLine: !this.state.hasLine
		});
	}

	toggleBordered = () => {
		this.setState({
			bordered: !this.state.bordered
		});
	}

	toggleBoxRadius = () => {
		let radiuses = [0, 5, 8, 10];
		let num = radiuses.indexOf(this.state.boxRadius);
		num = num == 3 ? 0 : ++num;

		this.setState({
			boxRadius: radiuses[num]
		});
	}

	toggleBlink = () => {
		this.setState({
			blink: !this.state.blink
		});
	}

	getRandomColor() {
		let col = function() {
			return Math.floor(Math.random() * (255 - 1 + 1)) + 1;
		};

		let rCol = col();
		let gCol = col();
		let bCol = col();

		return {
			'background': `rgba( ${rCol}, ${gCol}, ${bCol}, 1)`,
			'opacity': 0.3
		};
	}

	render() {
		const { items, boxSize, theme, hasLine, bordered, boxRadius, blink } = this.state;
		return (
			<div className="container">

				<div className="control-block">
					<input id="range" type="range" min="0" max="20" step="1" onChange={this.changeRange} /> 
				</div>

				<Chartify 
					data = {items}
					width = {50}				      
					height = {10}
					boxSize = {boxSize}
					boxRadius = {boxRadius}
					bordered = {bordered}
					line = {hasLine}
					theme = {theme} 
					blink = {blink} />

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
				</div>
			</div>
		);
	}

}

ReactDOM.render(<App />, document.getElementById('app'));