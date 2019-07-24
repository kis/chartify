/* eslint-disable */

import io from 'socket.io-client';
import store from '../store/store';

const host = 'ws://glances-example.herokuapp.com';
let socket: any = null;

function getSocket() {
  if (!socket) socket = io.connect(host);
  return socket;
}

getSocket().on('connect', (data: any) => {
});

getSocket().on('tiles', (data: any) => {
  store.dispatch({
    type: 'UPDATE_TIME_CHART',
    data,
  });
});

export default function connect() {
  getSocket();
}
