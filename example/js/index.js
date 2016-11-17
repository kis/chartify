import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chartify from 'chartify';
import votes from '../js/votes.json';

class App extends Component {

	state = {
		items: []
	}

	constructor() {
		super();
	}

	componentWillMount() {
		this.setState({
			items: votes.map(item => ({				
				value: item["моя оценка"],
				title: item["русскоязычное название"]
			})),
			boxSize: 16,
			theme: 'purple'
		});
	}

	changeChart = () => {
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
			boxSize: val
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

	render() {
		const { items, boxSize, theme } = this.state;
		return (
			<div className="container">
				<input id="range" type="range" min="0" max="20" step="1" onChange={this.changeRange} /> 

				<Chartify 
					data = {items}
					width = {50} 					      
					height = {10}
					boxSize = {boxSize}
					line = {true}
					theme = {theme} />

				<button 
					type="button" 
					className="button"
					onClick={this.changeChart}>
					Change chart
				</button>

				<button 
					type="button" 
					className="button"
					onClick={this.changeTheme}>
					Change theme
				</button>
			</div>
		);
	}

}

ReactDOM.render(<App />, document.getElementById('app'));