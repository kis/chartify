export function requestTeams(teams) {
	return {
		type: 'REQUEST_TEAMS',
		teams
	}
}

export function receiveTeams(teams) {
	return {
		type: 'RECEIVE_TEAMS',
		teams
	}
}

export function fetchTeams() {
	return function (dispatch) {
		dispatch(requestTeams(null));
    teamsData().then(res => dispatch(receiveTeams(res)));
	}
}

async function teamsData() {
  let teamsData = await fetch('/assets/football/Euro2016/teams.json');
  let res = await teamsData.json();
  return res.sheets.Teams;
}