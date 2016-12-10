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
			theme: 'default',
			hasLine: true,
			bordered: false
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
			hasLine: this.state.hasLine ? false : true
		});
	}

	toggleBordered = () => {
		this.setState({
			bordered: this.state.bordered ? false : true
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

	render() {
		const { items, boxSize, theme, hasLine, bordered, boxRadius } = this.state;
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
					theme = {theme} />

				<div className="control-block">
					<button 
						type="button" 
						className="button one"
						onClick={this.toggleLine}>
						Toggle line
					</button>

					<button 
						type="button" 
						className="button two"
						onClick={this.toggleBordered}>
						Toggle borders
					</button>

					<button 
						type="button" 
						className="button three"
						onClick={this.toggleBoxRadius}>
						Toggle box radius
					</button>

					<button 
						type="button" 
						className="button four"
						onClick={this.refreshData}>
						Refresh data
					</button>

					<button 
						type="button" 
						className="button five"
						onClick={this.changeTheme}>
						Change theme
					</button> 
				</div>
			</div>
		);
	}

}

ReactDOM.render(<App />, document.getElementById('app'));