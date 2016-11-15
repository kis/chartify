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
			}))
		});
	}

	handleClick = () => {
		const { items } = this.state;
		let newItems = items.map(item => {
			item.sortValue = Math.random().toFixed(5);
			return item;
		}).sort((a,b) => a.sortValue > b.sortValue ? 1 : -1);
		this.setState({
			items: newItems
		});
	}

	render() {
		const { items } = this.state;
		return (
			<div className="container">
				<Chartify 
					data = {items}
					width = {50} 					      
					height = {10}
					boxSize = {16}
					line = {true}
					theme = {"purple"} />
				<button 
					type="button" 
					className="button"
					onClick={this.handleClick}
				>Change chart</button>
			</div>
		);
	}

}

ReactDOM.render(<App />, document.getElementById('app'));