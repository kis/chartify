export function initConfig() {
	return {
		type: 'INIT_CONFIG'
	}
}

export function updateChart(data, config, chart) {
	return {
		type: 'UPDATE_CHART',
		data,
		config,
		chart
	}
}

export function getEvents(artist) {
	return {
		type: 'GET_EVENTS',
		artist
	}
}
