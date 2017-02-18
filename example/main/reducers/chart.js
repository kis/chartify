import * as util from '../util/util';

var initConfig = {
	data: util.getInitData(),
	config: {
		theme: 'default',
		width: 50,				      
		height: 10,
		box_size: 20,
		box_radius: 8,
		line: false,
		line_only: false,
		bordered: false,
		blink: false
	}
};

function chartApp(state = initConfig, action) {
	switch (action.type) {
	case 'INIT_CONFIG':
		return {...state, data: state.data, config: state.config};

	case 'UPDATE_CHART':
		return {...state, data: action.data, config: action.config};

	default:
		return state;
	}
}

export default chartApp;