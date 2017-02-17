var initConfig = {
	items: items,
	width: 50,				      
	height: 10,
	boxSize: 20,
	boxRadius: 10,
	theme: 'white',
	line: true,
	lineOnly: true,
	bordered: false,
	blink: false
};

export default function teams(state = initTeams, action) {
	switch (action.type) {
	case 'REQUEST_TEAMS':
		return {...state, teams: action.teams};

	case 'RECEIVE_TEAMS':
		return {...state, teams: action.teams};

	case 'FILTER_TEAMS':
		return {...state, activeGroupFilter: action.group};

	case 'RECEIVE_STANDINGS':
		return {...state, standings: action.standings};

	case 'TOGGLE_TEAMS':
		return {...state, showTeams: true, showStandings: false};

	case 'TOGGLE_STANDINGS':
		return {...state, showTeams: false, showStandings: true};

	default:
		return {...state};
	}
}
