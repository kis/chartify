import io from 'socket.io-client';
import store from '../store/store';

let host = 'ws://glances-example.herokuapp.com';
let socket = null;

function getSocket() {
	if (!socket) socket = io.connect(host);
	return socket;
}

getSocket().on('connect', (data) => {
	console.log('connected');
});

getSocket().on('tiles', (data) => {
    console.log(22223, data);
	store.dispatch({
		type: 'UPDATE_TIME_CHART', 
		data
	});
});

export function connect() {
	getSocket();
}