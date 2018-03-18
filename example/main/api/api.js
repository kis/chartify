import io from 'socket.io-client';

let host = 'ws://glances-example.herokuapp.com';
let socket = null;

// function getSocket() {
// 	if (!socket) socket = io.connect(host);
// 	return socket;
// }

// getSocket().on('connect', (data) => {
// 	console.log(2222, data);
// });

// getSocket().on('tiles', (data) => {
//     console.log(22223, data);
// 	// store.dispatch({
// 	// 	type: 'SEND_MESSAGE', 
// 	// 	user: data.user, 
// 	// 	message: data.msg
// 	// });
// });

export function connect() {
	getSocket();
}

export function newMove(obj) {
	getSocket().emit('new move', obj);
}