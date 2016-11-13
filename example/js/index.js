import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chartify from '../../chartify';
import '../../main.css';
import votes from '../js/votes.json';

class App extends Component {

	constructor() {
		super();
		this.items = [];
	}

	componentWillMount() {
		this.items = votes.map(item => {
			return {
				value: item["моя оценка"],
				title: item["русскоязычное название"]
			};
		});
	}

	render() {
		return (
			<div>
				<Chartify data = {this.items}
						  width = {50} 
					      height = {10}
					      boxSize = {16}
					      line = {true}
					      theme = {"purple"} />
			</div>
		);
	}

}

ReactDOM.render(<App />, document.getElementById('app'));