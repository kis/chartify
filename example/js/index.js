import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chartify from 'chartify';

class App extends Component {

	render() {
		return (
			<div>
				<h4>Hello 1!</h4>
				<Chartify />
			</div>
		);
	}

}

ReactDOM.render(<App />, document.getElementById('app'));