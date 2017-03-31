import React, { Component } from 'react';
import './map-search-panel.css';

export default class MapSearchPanel extends Component {

	constructor(props) {
		super();
	}

	search = () => {
		console.log(this.refs)
	}

	render() {
		return (
			<div className="map-search-panel">
				<input type="text" ref={(input) => { this.city = input; }} placeholder="Enter city..." />
				<button className="map-search-btn" onClick={this.search}>Search</button>
			</div>
		);
	}

}