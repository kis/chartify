export function initConfig() {
	return {
		type: 'INIT_CONFIG'
	}
}

export function updateChart(data, config) {
	return {
		type: 'UPDATE_CHART',
		data,
		config
	}
}