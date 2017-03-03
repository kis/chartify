import React, { Component } from 'react';
import './map-search-panel.css';

export default class MapSearchPanel extends Component {

	constructor(props) {
		super();
	}

	render() {
		return (
			<div className="map-search-panel">
				<input placeholder="Enter city..." />	
			</div>
		);
	}

}