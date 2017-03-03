import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import './map.css';
import 'mapbox-gl/dist/mapbox-gl.css';

export default class Map extends Component {

	constructor(props) {
		super();
	}

	componentDidMount() {
		mapboxgl.accessToken = 'pk.eyJ1Ijoia2lyaWxsc3R5b3BraW4iLCJhIjoiZjA3MTRlZDQzYzYyZmQ1ZGMyZDZkNjlhMjliMjQ2YjUifQ.BmlYKQnKTUcpLi2vk2AxYA';
		var map = new mapboxgl.Map({
		    container: 'map',
		    style: 'mapbox://styles/mapbox/streets-v9',
		    center: [-74.50, 40],
		    zoom: 9
		});
	}

	render() {
		return (
			<div id="map"></div>
		);
	}

}