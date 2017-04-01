import * as util from '../util/util';

var initConfig = {
	data: util.getInitData(),
	config: {
		theme: 'default',
		width: 50,				      
		height: 10,
		box_radius: 8,
		line: false,
		line_only: false,
		bordered: false,
		blink: false
	},
	itunes: util.getItunesData(),
	config_itunes: {
		theme: 'blue',
		width: 50,				      
		height: 10,
		box_radius: 0,
		line: false,
		line_only: false,
		bordered: false,
		blink: false
	}
};

function chartApp(state = initConfig, action) {
	switch (action.type) {
	case 'INIT_CONFIG':
		return { ...state, data: state.data, itunes: state.itunes, config: state.config };

	case 'UPDATE_CHART':
		if (action.chart == 'music') 
			return { ...state, itunes: action.data, config_itunes: action.config };
		if (action.chart == 'films') 
			return { ...state, data: action.data, config: action.config };

	default:
		return state;
	}
}

export default chartApp;