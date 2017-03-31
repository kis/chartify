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

export function fetchTeam(team) {
	return function (dispatch) {
		dispatch(requestTeam(null))
		teamData(team).then(res => dispatch(receiveTeam(res)));
	}
}

async function teamData(artist) {
	let api_key = 'iOAsnWYdLjjhNvvM';
	let teamData = await fetch(`http://api.songkick.com/api/3.0/events.json?apikey=${api_key}&artist_name=${artist}`);
	let res = await teamData.json();
	return res.sheets.Players;
}